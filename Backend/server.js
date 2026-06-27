require("dotenv").config();

console.log(process.env.EMAIL_USER);

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// PORT 587 WALA CONFIGURATION WITH BREVO
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, 
    auth: {
        user: "b02dce001@smtp-brevo.com", 
        pass: process.env.EMAIL_PASS // Yeh Render ke dashboard se connect karega
    }
});

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            // SAHI SENDER AUR RECEIVER DETAILS HERE
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
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Email Sending Failed"
        });
    }
});

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});