const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const NGO = require('../models/NGO');
const User = require('../models/User');

// GET /api/ngos - list all NGOs (public)
router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find().sort({ createdAt: -1 }).limit(50);
    res.json(ngos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/ngos/:id - get single NGO
router.get('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id).populate('user', 'name email');
    if (!ngo) return res.status(404).json({ msg: 'NGO not found' });
    res.json(ngo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/ngos - create or update NGO profile for logged in NGO user
router.post('/', auth, async (req, res) => {
  try {
    // only NGO users may create/update their profile
    if (req.user.role !== 'ngo') return res.status(403).json({ msg: 'Forbidden: only NGOs' });

    const { name, description, location, website } = req.body;
    let ngo = await NGO.findOne({ user: req.user.id });

    if (ngo) {
      ngo.name = name || ngo.name;
      ngo.description = description || ngo.description;
      ngo.location = location || ngo.location;
      ngo.website = website || ngo.website;
      await ngo.save();
      return res.json(ngo);
    }

    ngo = new NGO({
      user: req.user.id,
      name,
      description,
      location,
      website
    });
    await ngo.save();
    res.json(ngo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
