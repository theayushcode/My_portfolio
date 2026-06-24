const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AYUSH@123",
    database: "portfolio"
});

db.connect((err) => {
    if (err) {
        console.log("Database Error:", err);
        return;
    }

    console.log("MySQL Connected");
});

// Gmail Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "narayan.ayush0701@gmail.com",
        pass: "kitv sdpm kvhj whkb" // Use an App Password for Gmail Ayush@123....
    }
});

// Contact Form API
app.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    const sql =
        "INSERT INTO contacts(name,email,message) VALUES(?,?,?)";

    db.query(sql, [name, email, message], async (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        try {

            await transporter.sendMail({
                from: "narayan.ayush0701@gmail.com",
                to: "narayan.ayush0701@gmail.com",
                subject: `New Contact Form Message from ${name}`,
                html: `
                    <h2>New Portfolio Contact</h2>

                    <p><strong>Name:</strong> ${name}</p>

                    <p><strong>Email:</strong> ${email}</p>

                    <p><strong>Message:</strong></p>

                    <p>${message}</p>
                `
            });

            res.json({
                success: true,
                message: "Message Sent Successfully"
            });

        } catch (mailError) {

            console.log(mailError);

            res.status(500).json({
                success: false,
                message: "Email Sending Failed"
            });
        }
    });
});

// View All Messages
app.get("/messages", (req, res) => {

    db.query(
        "SELECT * FROM contacts ORDER BY id DESC",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

// Start Server
app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});