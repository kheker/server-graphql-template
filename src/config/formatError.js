import mongoose from 'mongoose';

export default err => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = [];
    Object.keys(err.errors).forEach(key => {
      const error = {
        path: err.errors[key].path,
        message: err.errors[key].message,
      };
      errors.push(error);
    });
    return errors;
  }
  return err;
};
