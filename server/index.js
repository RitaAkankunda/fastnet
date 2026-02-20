const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory payment store (phone -> { status, provider, plan, created })
const payments = {};

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'FASTNET backend running' });
});

// Initiate a payment (simulation)
app.post('/initiate-payment', (req, res) => {
  const { phone, provider, plan } = req.body || {};
  if (!phone) return res.status(400).json({ error: 'phone required' });

  payments[phone] = { status: 'PENDING', provider, plan, created: Date.now() };
  console.log(`Initiated payment for ${phone} (${provider} / ${plan})`);

  // Simulate asynchronous payment flow: mark SUCCESS after 10s
  setTimeout(() => {
    payments[phone].status = 'SUCCESS';
    console.log(`Payment SUCCESS for ${phone}`);
  }, 10000);

  res.json({ status: 'PENDING', message: 'Prompt sent to phone' });
});

// Polling endpoint used by frontend
app.get('/check-status', (req, res) => {
  const phone = req.query.phone;
  if (!phone) return res.status(400).json({ error: 'phone required' });

  const p = payments[phone];
  res.json({ status: p ? p.status : 'NOT_FOUND' });
});

// Optional webhook for real payment providers to POST callbacks
app.post('/webhook', (req, res) => {
  const { phone, status } = req.body || {};
  if (!phone) return res.status(400).json({ error: 'phone required' });

  payments[phone] = payments[phone] || { created: Date.now() };
  payments[phone].status = status;
  console.log(`Webhook: ${phone} -> ${status}`);
  res.json({ ok: true });
});

if (require.main === module) {
  app.listen(port, () => console.log(`FASTNET backend listening on http://localhost:${port}`));
}

module.exports = app;
