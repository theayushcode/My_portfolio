require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// Final secure proxy settings jo network block ko override karegi
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // TLS true
    auth: {
        user: "b02dce001@smtp-brevo.com",
        pass: process.env.EMAIL_PASS // Render Dashboard wali key yahan match hogi
    },
    tls: {
        rejectUnauthorized: false // Local networking checks bypass karne ke liye
    }
});

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: "narayan.ayush0701@gmail.com",
            to: "narayan.ayush0701@gmail.com",
            subject: `Portfolio Contact From ${name}`,
            html: `
                <h2>New Message</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b></p>
                <p>${message}</p>
            `
        });

        res.json({
            success: true,
            message: "Message Sent Successfully"
        });

    } catch (error) {
        console.log("Mail Engine Error:", error);
        res.status(500).json({
            success: false,
            message: "Email Sending Failed"
        });
    }
});

app.get("/", (req, res) => {
    res.send("Backend Engine Operational");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});