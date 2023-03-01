import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide a name'],
    trim: true,
    minlength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
});

// hash the password, the only reason the function is here is to keep controller as thin as possible
UserSchema.pre('save', async function () {
  //important or edit user controller will throw error
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//assign new method on user that create token so i can call it from auth controller
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    // expiresIn: '100',
  });
};

//compare user password and hashed password if they match
UserSchema.methods.comparePassword = async function (loginPassword) {
  const isMatch = await bcrypt.compare(loginPassword, this.password);
  return isMatch;
};

export default mongoose.model('User', UserSchema);
