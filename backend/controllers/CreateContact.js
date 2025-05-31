const sendEmail = require('../config/nodemailer');
const Contact = require('../models/ContactSchema');

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({ name, email, subject, message });

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting us!',
      text: `Hi ${name},\n\nThank you for reaching out to us regarding "${subject}".\n\nWe have received your message:\n\n"${message}"\n\nOur team will get back to you shortly.\n\nBest regards,\nGDG-MMMUT`,
    });

    // Set emailSent flag and save to DB
    newContact.emailSent = true;
    await newContact.save();

    return res.status(200).json({
      message: 'Your message has been received and a confirmation email has been sent.',
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
