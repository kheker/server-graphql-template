import mongoose from 'mongoose';
// import pick from 'lodash/pick';

export default err => {
  if (err instanceof mongoose.Error.ValidationError) {
    // console.log(Object.keys(err.errors));
    const errors = [];
    Object.keys(err.errors).forEach(key => {
      const error = {
        path: err.errors[key].path,
        message: err.errors[key].message,
      };
      // console.log(err.errors[key].message);
      // console.log(err.errors[key].path);
      errors.push(error);
    });
    return errors;
    // console.log(pick(err, ['message']));
  }

  return [{ path: 'name', message: 'something went wrong' }];
};
