import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

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
