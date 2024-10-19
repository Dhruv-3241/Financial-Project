const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userVerificationSchema = new schema({
  userID: { type: String, required: true },
  uniqueString: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('UserVerification', userVerificationSchema);