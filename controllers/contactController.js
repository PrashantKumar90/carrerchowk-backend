require('dotenv').config(); // Must be at the very top
const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Validate input data
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required"
    });
  }

  // 2. Validate environment variables
  if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD || !process.env.YOUR_RECEIVING_EMAIL) {
    console.error('Missing email configuration in .env file');
    return res.status(500).json({
      success: false,
      error: "Server configuration error"
    });
  }

  // 3. Create transporter with secure settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false // For development only
    }
  });

  try {
    // 4. Send email to admin
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.YOUR_RECEIVING_EMAIL,
      subject: `New Contact: ${name}`,
      html: `
        <h3>New Qery Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message: ${message.replace(/\n/g, '<br>')}</strong></p>`
    });

    // 5. Send confirmation to user
    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "We've received your message!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for contacting us! We've received your message and will respond within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,<br>Carrer Chowk</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      success: false,
      error: "Failed to send email. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};