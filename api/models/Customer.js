const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  organization: { type: String },
  jobProfile: { type: String },
  additionalInfo: { type: String },
});

module.exports = mongoose.model("Customer", customerSchema);
