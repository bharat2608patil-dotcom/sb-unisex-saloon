import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { contact } from "./config.js";

const apiDir = path.resolve("api");

// Load HTML template
function loadTemplate(fileName) {
  return fs.readFileSync(
    path.join(apiDir, fileName),
    "utf8"
  );
}

// Replace template variables
function replaceTemplate(html, data) {
  return html.replace(/\$\{(\w+)\}/g, (_, key) => {
    return data[key] ?? "";
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method Not Allowed",
    });
  }

  const bookingId = `PS-${Date.now()}`;

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

const templateData = {
  name,
  phone: phone || "-",
  email: email || "-",
  service,
  date,
  time,
  notes: notes || "-",
  bookingId,

  websiteUrl: process.env.WEBSITE_URL || "#",
  whatsappUrl: contact.whatsappUrl || "#",

};

    const ownerHtml = replaceTemplate(
      loadTemplate("owner.html"),
      templateData
    );

    const customerHtml = replaceTemplate(
      loadTemplate("customer.html"),
      templateData
    );

    // Send booking details to salon owner
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      replyTo: email || process.env.SMTP_FROM,
      subject: _subject || "New Booking Request",
      html: ownerHtml,
    });

    // Send confirmation email to customer
    if (email) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Booking Request Received",
        html: customerHtml,
      });
    }

    return res.status(200).json({
      ok: true,
      bookingId,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}