const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  phone: { type: String, trim: true },
  
  // Doctor-specific fields
  specialization: { type: String },
  licenseNumber: { type: String },
  hospital: { type: String },
  experience: { type: Number },
  isVerified: { type: Boolean, default: false },
  
  // Patient-specific fields
  dateOfBirth: { type: Date },
  bloodGroup: { type: String },
  address: { type: String },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  
  // QR Code
  qrCode: { type: String },
  qrToken: { type: String, unique: true, sparse: true },

  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
