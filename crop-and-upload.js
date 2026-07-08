// Crop hair oil.jpg to 500x500 square and upload to Sanity
const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = 'skAK3pwFxT0FLE7nhGUIDtr5r4RQasZNUGxF2GQtNimFiaqXOSaftY3qtoJ6sZDPh56WntoympMXRi3cv42y95M6sGxQVomYWz6TPxVTNSNtM7AEGcHB1F9sQTX3yUJIiBAZpEejfZYgbaHOP2DMZrekzKV045UNoAWjHCqIDajnAESawet';
const imgPath = path.join(__dirname, 'public', 'Images', 'hair oil.jpg');
const croppedPath = path.join(__dirname, 'public', 'Images', 'hair-oil-cropped.jpg');

function api(method, pathname, body, headers) {
  return new Promise((resolve, reject) => {
    const url = new URL('https://jfxnntpa.api.sanity.io/v2024-01-01' + pathname);
    const opts = { hostname: url.hostname, path: url.pathname, method, headers: { 'Authorization': 'Bearer ' + TOKEN } };
    Object.assign(opts.headers, headers || {});
    if (body) opts.headers['Content-Length'] = Buffer.byteLength(body);
    const req = https.request(opts, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve({ s: res.statusCode, d: JSON.parse(d) }); } catch (e) { resolve({ s: res.statusCode, d }); } }); });
    req.on('error', reject); if (body) req.write(body); req.end();
  });
}

async function main() {
  // Step 1: Crop
  console.log('1. Cropping image...');
  const meta = await sharp(imgPath).metadata();
  const size = Math.min(meta.width, meta.height);
  await sharp(imgPath)
    .extract({ left: Math.floor((meta.width - size) / 2), top: Math.floor((meta.height - size) / 2), width: size, height: size })
    .resize(500, 500)
    .jpeg({ quality: 90 })
    .toFile(croppedPath);
  console.log('   Cropped to:', croppedPath);

  // Step 2: Upload
  console.log('2. Uploading to Sanity...');
  const imgBuf = fs.readFileSync(croppedPath);
  const boundary = '----Bound' + Math.random().toString(36).slice(2);
  const body = Buffer.concat([
    Buffer.from('--' + boundary + '\r\nContent-Disposition: form-data; name="file"; filename="hair-oil.jpg"\r\nContent-Type: image/jpeg\r\n\r\n'),
    imgBuf,
    Buffer.from('\r\n--' + boundary + '--\r\n')
  ]);

  const up = await api('POST', '/assets/images/production', body, { 'Content-Type': 'multipart/form-data; boundary=' + boundary });
  console.log('   Status:', up.s);
  const assetId = up.d?.document?._id;
  console.log('   Asset ID:', assetId);
  if (!assetId) { console.log('   Error:', JSON.stringify(up.d).slice(0, 300)); return; }

  // Step 3: Assign to product
  console.log('3. Assigning image to Anti-Dandruff Hair Oil...');
  const mut = await api('POST', '/data/mutate/production', JSON.stringify({
    mutations: [{ patch: { id: '802793e3-4206-4ee9-88e5-55e8a7685136', set: { image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } } } }]
  }));
  console.log('   Result:', JSON.stringify(mut.d));

  // Cleanup
  fs.unlinkSync(croppedPath);
  console.log('✅ Complete!');
}

main().catch(e => console.error('❌', e.message));
