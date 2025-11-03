const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const NGO = require('../models/NGO');

// POST /api/auth/signup
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password 6+ chars'),
    body('role').isIn(['ngo', 'donor']).withMessage('Role must be ngo or donor')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role, ngoName, description, location, website } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashed, role });
      await user.save();

      // if NGO, create NGO profile document
      let ngo = null;
      if (role === 'ngo') {
        ngo = new NGO({
          user: user._id,
          name: ngoName || name,
          description: description || '',
          location: location || '',
          website: website || ''
        });
        await ngo.save();
      }

      const payload = { user: { id: user._id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }, ngo });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const payload = { user: { id: user._id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

      // If NGO we might want to return NGO profile
      let ngo = null;
      if (user.role === 'ngo') ngo = await require('../models/NGO').findOne({ user: user._id });

      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }, ngo });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
