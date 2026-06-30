require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Brevo ki Transactional Email API (Yeh Render par KABHI block nahi hoti)
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
    "accept": "application/json",
    "api-key": process.env.EMAIL_PASS, // Agar aap API key use kar rahe hain
    // AGAR SMTP KEY HAI TOH YE LINE BHI CHAL JAYEGI:
    "x-sib-api-key": process.env.EMAIL_PASS, 
    "content-type": "application/json"
},
            body: JSON.stringify({
                sender: { name: "Portfolio", email: "narayan.ayush0701@gmail.com" },
                to: [{ email: "narayan.ayush0701@gmail.com", name: "Ayush" }],
                subject: `Portfolio Contact From ${name}`,
                htmlContent: `
                    <h2>New Message Received</h2>
                    <p><b>Name:</b> ${name}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Message:</b></p>
                    <p>${message}</p>
                `
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Brevo API Error:", errorData);
            throw new Error("API response was not ok");
        }

        res.json({ success: true, message: "Message Sent Successfully" });

    } catch (error) {
        console.log("Error Details:", error);
        res.status(500).json({ success: false, message: "Email Sending Failed" });
    }
});

app.get("/", (req, res) => {
    res.send("Backend Engine is Online");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});