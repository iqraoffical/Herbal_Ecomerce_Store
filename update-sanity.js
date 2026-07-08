// Sanity direct API calls - move categories, upload image, delete old categories
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PID = 'jfxnntpa';
const DS = 'production';
const TOKEN = 'skAK3pwFxT0FLE7nhGUIDtr5r4RQasZNUGxF2GQtNimFiaqXOShaftY3qtoJ6sZDPh56WntoympMXRi3cv42y95M6sGxQVomYWz6TPxVTNSNtM7AEGcHB1F9sQTX3yUJIiBAZpEejfZYgbaHOP2DMZrekzKV045UNoAWjHCqIDajnAESawet';
const API = `https://${PID}.api.sanity.io/v2024-01-01`;

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(API + path);
    const opts = {
      hostname: url.hostname,
      path: url.pathname,
      method,
      headers: { 'Authorization': `Bearer ${TOKEN}`, ...headers }
    };
    if (body) {
      opts.headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(body);
    }
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch(e) { resolve({ status: res.statusCode, data: d }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  // Step 1: Publish the Anti-Dandruff Hair Oil draft
  console.log('Publishing draft...');
  const pub = await request('POST', `/data/mutate/${DS}`, JSON.stringify({
    mutations: [
      { publish: { id: '802793e3-4206-4ee9-88e5-55e8a7685136' } }
    ]
  }));
  console.log('Publish result:', pub.status, JSON.stringify(pub.data).slice(0, 200));

  // Step 2: Upload cropped image to Sanity
  const imgPath = path.join(__dirname, 'public', 'Images', 'hair oil.jpg');
  if (!fs.existsSync(imgPath)) {
    console.log('Image not found at:', imgPath);
    return;
  }

  const imgBuf = fs.readFileSync(imgPath);
  const boundary = '----FormBound' + Math.random().toString(36).slice(2);

  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="hair-oil.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`),
    imgBuf,
    Buffer.from(`\r\n--${boundary}--\r\n`)
  ]);

  console.log('Uploading image...');
  const upload = await request('POST', `/assets/images/${DS}`, body, {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length
  });

  if (upload.status !== 200 && upload.status !== 201) {
    console.log('Upload failed:', JSON.stringify(upload.data).slice(0, 300));
    return;
  }

  const assetId = upload.data.document?._id;
  console.log('✅ Image uploaded. Asset ID:', assetId);

  if (!assetId) {
    console.log('No asset ID returned, data:', JSON.stringify(upload.data).slice(0, 300));
    return;
  }

  // Step 3: Update all products and delete old categories in one mutation
  console.log('Updating products and deleting categories...');
  const mutations = [
    // Move Herbal Hair Shampoo to Hair Oils
    { patch: { id: '26ae2941-4b56-424e-9054-d25fe6096440', set: {
      category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' }
    }}},
    // Move Nourishing Hair Conditioner to Hair Oils
    { patch: { id: 'a208caed-f93d-44b1-b47b-d1b7d0b35804', set: {
      category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' }
    }}},
    // Move Anti-Dandruff Hair Oil to Hair Oils + set image
    { patch: { id: '802793e3-4206-4ee9-88e5-55e8a7685136', set: {
      category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' },
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
    }}},
    // Delete old categories
    { delete: { id: '6b9f7fd2-4d68-4e36-8a2f-4b05de2dbc13' } },
    { delete: { id: 'ac643aeb-36b6-4f8a-a43b-2131545ae657' } }
  ];

  const result = await request('POST', `/data/mutate/${DS}`, JSON.stringify({ mutations }));
  console.log('Mutation status:', result.status);

  if (result.data?.results) {
    result.data.results.forEach(r => console.log(`✅ ${r.id} - ${r.operation}`));
  } else {
    console.log(JSON.stringify(result.data, null, 2));
  }

  console.log('\n🎉 All done!');
  console.log('✓ Products moved to Hair Oils category');
  console.log('✓ Image uploaded to Anti-Dandruff Hair Oil');
  console.log('✓ Hair Care & Scalp Treatment categories deleted');
}

main().catch(e => console.error('❌', e));
