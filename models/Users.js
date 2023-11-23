const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Country: String,
  Email: String,
  Interests: { type: String, default: "" },
  LastSalaryDate: { type: String, default: "" },
  Notes: { type: String, default: "" },
  Password: String,
  Username: String,
  Usertype: String,

  /* Country: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Interests: { type: String, default: "" },
  LastSalaryDate: { type: String, default: "" },
  Notes: { type: String, default: "" },
  Password: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Usertype: { type: String, required: true }, */
}, { collection: 'Users', versionKey: false });

const User = mongoose.model('Users', userSchema);

module.exports = User;
