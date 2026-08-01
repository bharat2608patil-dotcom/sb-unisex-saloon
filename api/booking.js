import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { contact } from "./config.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDir = __dirname;


// Load HTML template
function loadTemplate(fileName) {
  console.log("Loading template:", fileName);

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

    console.log("Booking API started");


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


    console.log("Request data received");


    if (!name || !service || !date || !time) {
      return res.status(400).json({
        ok: false,
        error: "Required fields are missing.",
      });
    }


    console.log("Creating transporter");


    const transporter = nodemailer.createTransport({

      host: process.env.SMTP_HOST,

      port: Number(process.env.SMTP_PORT),

      secure: Number(process.env.SMTP_PORT) === 465,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

    });


    console.log({
      SMTP_HOST: process.env.SMTP_HOST ? "exists" : "missing",
      SMTP_USER: process.env.SMTP_USER ? "exists" : "missing",
      SMTP_PASS: process.env.SMTP_PASS ? "exists" : "missing",
      SMTP_FROM: process.env.SMTP_FROM ? "exists" : "missing",
      SMTP_TO: process.env.SMTP_TO ? "exists" : "missing",
    });


    await transporter.verify();


    console.log("SMTP verified");


    const templateData = {

      name,

      phone: phone || "-",

      email: email || "-",

      service,

      date,

      time,

      notes: notes || "-",

      bookingId,


      websiteUrl:
        process.env.WEBSITE_URL || "#",


      whatsappUrl:
        contact.whatsappUrl || "#",

    };


    console.log("Loading templates");


    const ownerHtml = replaceTemplate(
      loadTemplate("templates/owner.html"),
      templateData
    );

    const customerHtml = replaceTemplate(
      loadTemplate("templates/customer.html"),
      templateData
    );


    console.log("Sending owner email");


    await transporter.sendMail({

      from: process.env.SMTP_FROM,

      to: process.env.SMTP_TO,

      replyTo: email || process.env.SMTP_FROM,

      subject: _subject || "New Booking Request",

      html: ownerHtml,

    });


    console.log("Owner email sent");


    if (email) {

      console.log("Sending customer email");


      await transporter.sendMail({

        from: process.env.SMTP_FROM,

        to: email,

        subject: "Booking Request Received",

        html: customerHtml,

      });


      console.log("Customer email sent");

    }


    return res.status(200).json({

      ok: true,

      bookingId,

    });


  } catch (err) {


    console.error("BOOKING ERROR:", err);


    return res.status(500).json({

      ok: false,

      error: err.message,

    });

  }

}