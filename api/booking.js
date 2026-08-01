import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method Not Allowed",
    });
  }

  try {
    const {
      name,
      phone,
      email,
      service,
      date,
      time,
      notes,
      _subject,
    } = req.body;

    if (!name || !service || !date || !time) {
      return res.status(400).json({
        ok: false,
        error: "Required fields are missing.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      replyTo: email || process.env.SMTP_FROM,
      subject: _subject || "New Booking Request",
      html: `
      <div style="font-family:Arial;padding:20px">
      
      <h2>📅 New Booking Request</h2>

      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;width:100%">
        <tr>
          <td><b>Name</b></td>
          <td>${name}</td>
        </tr>

        <tr>
          <td><b>Phone</b></td>
          <td>${phone || "-"}</td>
        </tr>

        <tr>
          <td><b>Email</b></td>
          <td>${email || "-"}</td>
        </tr>

        <tr>
          <td><b>Service</b></td>
          <td>${service}</td>
        </tr>

        <tr>
          <td><b>Date</b></td>
          <td>${date}</td>
        </tr>

        <tr>
          <td><b>Time</b></td>
          <td>${time}</td>
        </tr>

        <tr>
          <td><b>Notes</b></td>
          <td>${notes || "-"}</td>
        </tr>

      </table>

      </div>
      `,
    });

    // Confirmation email to customer
    if (email) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Booking Request Received",
        html: `
        <div style="font-family:Arial;padding:20px">

        <h2>Thank you for your booking request!</h2>

        <p>Hello <b>${name}</b>,</p>

        <p>
        We have received your booking request.
        Our team will contact you shortly to confirm your appointment.
        </p>

        <hr>

        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>

        <br>

        <p>
        Regards,<br>
        Premium Studio Unisex Salon
        </p>

        </div>
        `,
      });
    }

    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}