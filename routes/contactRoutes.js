const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');


// Simplified inline validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Name, email, and message are required' 
    });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }

  next();
};

router.post(
  '/',
  validateContactForm, // inline validation
  contactController.sendEmail
);

module.exports = router;