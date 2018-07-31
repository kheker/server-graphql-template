import User from '../models/User';

export const RequireAuth = async user => {
  if (!user || !user.id) {
    throw new Error('Unauthorized!');
  }

  const me = await User.findById(user.id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me;
};

