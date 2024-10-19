const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  originalname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// const userSchema = new schema({
//   originalname: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   verified: { type: Boolean, default: false }
// });

module.exports = mongoose.model('User', userSchema);