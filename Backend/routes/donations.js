const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const User = require('../models/User');

// POST /api/donations - create donation (donor only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'donor') return res.status(403).json({ msg: 'Only donors can donate via this endpoint' });

    const { ngoId, amount, message } = req.body;
    if (!ngoId || !amount) return res.status(400).json({ msg: 'ngoId and amount required' });

    const ngo = await NGO.findById(ngoId);
    if (!ngo) return res.status(404).json({ msg: 'NGO not found' });

    const donation = new Donation({
      donor: req.user.id,
      ngo: ngoId,
      amount,
      message
    });
    await donation.save();

    ngo.totalFundsRaised = (ngo.totalFundsRaised || 0) + Number(amount);
    await ngo.save();

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/donations/ngo/:ngoId - list donations for an NGO (protected: NGO owner or admin)
router.get('/ngo/:ngoId', auth, async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.ngoId);
    if (!ngo) return res.status(404).json({ msg: 'NGO not found' });

    // restrict to NGO owner or donors listing own donations (simple approach)
    if (req.user.role === 'ngo' && String(ngo.user) !== String(req.user.id)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const donations = await Donation.find({ ngo: req.params.ngoId }).populate('donor', 'name email').sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/donations/me - donations of current user
router.get('/me', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id }).populate('ngo', 'name').sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
