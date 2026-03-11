const crypto = require('crypto');
const https = require('https');

const secret = '75d45fb97d7c3dea689e6b47e787e1143918c26da7b4ad82a2e9dc7e4b9ea8aa';
const resendKey = 're_XQ3H5G6g_Hok4tqBx6MXdn6TxrBXeLGrn';

// Generate download token (72 hour expiry)
const sessionId = 'email-test-' + Date.now();
const expiry = Date.now() + 72 * 3600000;
const payload = `${sessionId}:${expiry}`;
const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
const token = Buffer.from(`${payload}:${signature}`).toString('base64url');
const downloadUrl = `https://www.manamongsttheclouds.com/api/download/${token}`;

const emailData = JSON.stringify({
  from: 'Stillfire Press <books@stillfirepress.com>',
  to: 'justincronk@pm.me',
  subject: 'Your copy of Man Amongst the Clouds \u2014 Part I',
  html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#ededed;font-family:Georgia,serif">
<div style="max-width:560px;margin:0 auto;padding:40px 24px">
  <p style="color:#c9a84c;font-size:11px;letter-spacing:.35em;text-transform:uppercase;text-align:center;margin-bottom:32px">Stillfire Press</p>
  <h1 style="font-size:28px;font-weight:300;text-align:center;letter-spacing:.05em;line-height:1.3;margin-bottom:8px">Thank you for your purchase.</h1>
  <p style="text-align:center;color:#8a8a8a;font-style:italic;font-size:16px;margin-bottom:40px">The Song begins.</p>
  <div style="border:1px solid rgba(201,168,76,0.2);padding:32px;text-align:center;margin-bottom:32px">
    <p style="font-size:14px;color:#b0a89e;margin-bottom:4px">Man Amongst the Clouds</p>
    <p style="font-size:12px;color:#666;margin-bottom:24px">Part I: The Still Water &mdash; Prologue + Chapters 1&ndash;10</p>
    <a href="${downloadUrl}" style="display:inline-block;padding:14px 32px;background:#c9a84c;color:#0a0a0a;font-size:13px;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;font-family:sans-serif">Download Your Book (EPUB)</a>
    <p style="font-size:11px;color:#555;margin-top:16px">This link expires in 72 hours. Save your file after downloading.</p>
  </div>
  <p style="font-size:14px;color:#999;line-height:1.7;margin-bottom:24px">The full novel is coming Fall 2026. Visit <a href="https://www.manamongsttheclouds.com" style="color:#c9a84c;text-decoration:none">manamongsttheclouds.com</a> for updates.</p>
  <div style="border-top:1px solid #222;padding-top:24px;margin-top:32px">
    <p style="font-size:12px;color:#444;text-align:center;font-style:italic">&ldquo;The world sang to itself. And in the space between the notes, where silence lived, a man breathed &mdash; and the air remembered.&rdquo;</p>
    <p style="font-size:11px;color:#333;text-align:center;margin-top:16px">Stillfire Press &middot; A Cronk Companies, LLC Project</p>
  </div>
</div></body></html>`
});

const options = {
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${resendKey}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(emailData)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${body}`);
    console.log(`\nDownload URL: ${downloadUrl}`);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(emailData);
req.end();
