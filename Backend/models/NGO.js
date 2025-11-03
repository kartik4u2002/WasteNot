const mongoose = require('mongoose');

const NGOSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // owner
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  website: { type: String },
  totalFundsRaised: { type: Number, default: 0 },
  activeCampaigns: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NGO', NGOSchema);
