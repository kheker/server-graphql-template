import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlenght: 6,
      required: [true, ' Password is required.'],
    },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticate(password) {
    return compareSync(password, this.password);
  },
};
export default mongoose.model('User', UserSchema);
