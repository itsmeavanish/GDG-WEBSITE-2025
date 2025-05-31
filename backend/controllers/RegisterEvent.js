const Registration = require('../models/Registration');

exports.registerForEvent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      college,
      year,
      branch,
      reason,
      eventId
    } = req.body;

    // Basic duplicate check
    const existing = await Registration.findOne({ email, eventId });
    if (existing) {
      return res.status(400).json({ message: 'You have already registered for this event.' });
    }

    const registration = new Registration({
      fullName,
      email,
      phone,
      college,
      year,
      branch,
      reason,
      eventId
    });

    await registration.save();

    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
