const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { emailConfig } = require('../config'); // Import email configuration from server/config/index.js

/**
 * @function validateContactForm
 * @description Helper function to validate incoming contact form data.
 * @param {string} name - The sender's name.
 * @param {string} email - The sender's email address.
 * @param {string} message - The sender's message.
 * @returns {string|null} An error message if validation fails, otherwise null.
 */
const validateContactForm = (name, email, message) => {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return 'Name is required.';
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return 'Email is required.';
    }
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Invalid email format.';
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
        return 'Message is required.';
    }
    return null; // No validation errors
};

/**
 * @route POST /api/contact
 * @description Handles incoming contact form submissions.
 *              Validates input, sends an email to the portfolio owner,
 *              and responds with success or error.
 * @access Public
 */
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // 1. Input Validation
    const validationError = validateContactForm(name, email, message);
    if (validationError) {
        console.warn(`Contact form validation failed: ${validationError} for input:`, req.body);
        return res.status(400).json({ success: false, message: validationError });
    }

    // 2. Check for complete email configuration
    if (!emailConfig || !emailConfig.host || !emailConfig.auth || !emailConfig.auth.user || !emailConfig.auth.pass || !emailConfig.recipientEmail) {
        console.error('Server email configuration is missing or incomplete. Please check .env and server/config/index.js.');
        return res.status(500).json({ success: false, message: 'Server email configuration error. Please try again later.' });
    }

    // 3. Create a Nodemailer transporter using SMTP details from config
    const transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure, // true for 465 (SSL/TLS), false for other ports (STARTTLS)
        auth: {
            user: emailConfig.auth.user, // Your email address (e.g., for sending)
            pass: emailConfig.auth.pass  // Your email password or app-specific password
        },
        // Optional: Add TLS options for specific security needs, e.g., self-signed certs
        // tls: {
        //     rejectUnauthorized: false // Use with caution, only for testing or specific setups
        // }
    });

    // 4. Define the email content
    const mailOptions = {
        from: `"${name}" <${emailConfig.auth.user}>`, // Sender displayed as "Name <your_sending_email>"
        replyTo: email, // Set reply-to to the actual sender's email
        to: emailConfig.recipientEmail, // The portfolio owner's email address
        subject: `New Contact Form Submission from ${name} - Personal Portfolio`,
        html: `
            <p>You have received a new message from your Personal Portfolio Website contact form.</p>
            <h3>Contact Details:</h3>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            </ul>
            <h3>Message:</h3>
            <p style="white-space: pre-wrap; background-color: #f8f8f8; padding: 15px; border-left: 3px solid #007bff;">${message}</p>
            <br>
            <p>---</p>
            <p>This message was sent via your Personal Portfolio Website.</p>
            <p style="font-size: 0.8em; color: #666;">
                <em>For a more robust notification system across your microservices (e.g., Collaborative Task Management, Micro Social Media Dashboard, Multi-vendor E-commerce Marketplace),
                consider integrating with a dedicated Notification Service.</em>
            </p>
        `,
        text: `New Contact Form Submission from ${name} (${email}):\n\nMessage:\n${message}\n\n---\nThis message was sent via your Personal Portfolio Website.`
    };

    // 5. Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Contact form submission received from ${name} (${email}). Email sent successfully: ${info.messageId}`);
        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error sending contact form email:', error);
        // In a production environment, you might log this error to a dedicated logging service
        // or trigger an alert. Avoid exposing raw error details to the client.
        res.status(500).json({ success: false, message: 'Failed to send your message. Please try again later.' });
    }
});

module.exports = router;