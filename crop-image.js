// Crop hair oil image and upload to Sanity
const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname, 'public', 'Images', 'hair oil.jpg');
const outputPath = path.join(__dirname, 'public', 'Images', 'hair-oil-cropped.jpg');
const projectId = 'jfxnntpa';
const dataset = 'production';
const token = 'skAK3pwFxT0FLE7nhGUIDtr5r4RQasZNUGxF2GQtNimFiaqXOShaftY3qtoJ6sZDPh56WntoympMXRi3cv42y95M6sGxQVomYWz6TPxVTNSNtM7AEGcHB1F9sQTX3yUJIiBAZpEejfZYgbaHOP2DMZrekzKV045UNoAWjHCqIDajnAESawet';

async function cropAndUpload() {
  // Step 1: Crop image to square (center crop)
  const metadata = await sharp(imagePath).metadata();
  const size = Math.min(metadata.width, metadata.height);
  const left = Math.floor((metadata.width - size) / 2);
  const top = Math.floor((metadata.height - size) / 2);

  await sharp(imagePath)
    .extract({ left, top, width: size, height: size })
    .resize(500, 500)
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log('✅ Cropped image saved to:', outputPath);

  // Step 2: Upload to Sanity
  const imageBuffer = fs.readFileSync(outputPath);
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).slice(2);

  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="hair-oil.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`),
    imageBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`)
  ]);

  // Upload image asset
  const uploadResult = await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: `${projectId}.api.sanity.io`,
      path: `/v2024-01-01/assets/images/${dataset}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('Parse failed: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });

  console.log('✅ Image uploaded to Sanity:', uploadResult.document?.assetId || uploadResult.document?._id);
  console.log('URL:', uploadResult.url);

  // Step 3: Update all products in Hair Oils category with this image
  const imageRef = uploadResult.document;
  const productIds = [
    '26ae2941-4b56-424e-9054-d25fe6096440',
    'a208caed-f93d-44b1-b47b-d1b7d0b35804',
    '802793e3-4206-4ee9-88e5-55e8a7685136'
  ];

  const mutations = productIds.map(id => ({
    patch: { id, set: { image: { _type: 'image', asset: { _type: 'reference', _ref: imageRef._id } } } }
  }));

  // Also move categories to Hair Oils and delete old categories
  mutations.push(
    { patch: { id: '26ae2941-4b56-424e-9054-d25fe6096440', set: { category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' } } } },
    { patch: { id: 'a208caed-f93d-44b1-b47b-d1b7d0b35804', set: { category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' } } } },
    { patch: { id: '802793e3-4206-4ee9-88e5-55e8a7685136', set: { category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' } } } },
    { delete: { id: '6b9f7fd2-4d68-4e36-8a2f-4b05de2dbc13' } },
    { delete: { id: 'ac643aeb-36b6-4f8a-a43b-2131545ae657' } }
  );

  await new Promise((resolve, reject) => {
    const data = JSON.stringify({ mutations });
    const req = https.request({
      hostname: `${projectId}.api.sanity.io`,
      path: `/v2024-01-01/data/mutate/${dataset}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          if (j.results) j.results.forEach(r => console.log(`✅ ${r.id} - ${r.operation}`));
          else console.log(JSON.stringify(j, null, 2));
          resolve();
        } catch(e) { reject(new Error('Parse failed: ' + d)); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });

  console.log('🎉 All done! Cropped image uploaded and assigned to all Hair Oils products.');
  console.log('🗑️ Hair Care and Scalp Treatment categories deleted.');
}

cropAndUpload().catch(e => console.error('❌', e.message));
