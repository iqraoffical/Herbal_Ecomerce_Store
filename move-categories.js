const https = require('https');

const projectId = 'jfxnntpa';
const dataset = 'production';
const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
const token = 'skAK3pwFxT0FLE7nhGUIDtr5r4RQasZNUGxF2GQtNimFiaqXOShaftY3qtoJ6sZDPh56WntoympMXRi3cv42y95M6sGxQVomYWz6TPxVTNSNtM7AEGcHB1F9sQTX3yUJIiBAZpEejfZYgbaHOP2DMZrekzKV045UNoAWjHCqIDajnAESawet';

const data = JSON.stringify({
  mutations: [
    { patch: { id: '26ae2941-4b56-424e-9054-d25fe6096440', set: { category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' } } } },
    { patch: { id: 'a208caed-f93d-44b1-b47b-d1b7d0b35804', set: { category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' } } } },
    { patch: { id: '802793e3-4206-4ee9-88e5-55e8a7685136', set: { category: { _type: 'reference', _ref: '567bfda7-567d-4451-a3a7-c780c04b2536' } } } },
    { delete: { id: '6b9f7fd2-4d68-4e36-8a2f-4b05de2dbc13' } },
    { delete: { id: 'ac643aeb-36b6-4f8a-a43b-2131545ae657' } }
  ]
});

const req = https.request(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const j = JSON.parse(body);
    if (j.results) j.results.forEach(r => console.log('✅ ' + r.id + ' - ' + r.operation));
    else console.log(JSON.stringify(j, null, 2));
  });
});
req.on('error', e => console.error('❌ ' + e.message));
req.write(data);
req.end();
