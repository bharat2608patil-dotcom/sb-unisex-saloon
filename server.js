import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/booking', async (req, res) => {
  try {
    const { name, phone, email, service, date, time, notes, _subject } = req.body || {};

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || 'bharat2611patil@gmail.com',
      subject: _subject || 'New booking enquiry',
      html: `
        <h3>New booking enquiry</h3>
        <p><strong>Name:</strong> ${name || ''}</p>
        <p><strong>Phone:</strong> ${phone || ''}</p>
        <p><strong>Email:</strong> ${email || ''}</p>
        <p><strong>Service:</strong> ${service || ''}</p>
        <p><strong>Preferred Date:</strong> ${date || ''}</p>
        <p><strong>Preferred Time:</strong> ${time || ''}</p>
        <p><strong>Additional Notes:</strong> ${notes || ''}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`SMTP server listening on port ${port}`);
});
