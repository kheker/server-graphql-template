<<<<<<< HEAD
import Member from '../models/Members';

export const adminPermision = async (user, cardOwner) => {
=======
import User from '../models/User';

export const RequireAuth = async user => {
>>>>>>> c27180486b6d666bb0e2f5d12a7552cfb4d11859
  if (!user || !user.id) {
    throw new Error('Unauthorized!');
  }

<<<<<<< HEAD
  if (user.id !== cardOwner) {
    throw new Error('Unauthorized!');
  }
};

export const memberPermision = async (user, teamId) => {
  if (!user || !user.id) {
    throw new Error('Unauthorized!');
  }
  const member = await Member.findOne({ user: user.id, team: teamId });

  if (!member  || member == null) {
    throw new Error('Unauthorized!');
  }
  /*
  if (member.role !== 'admin' || member.role !== 'moderator') {
    throw new Error('Unauthorized!');
  }
  */
};
=======
  const me = await User.findById(user.id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me;
};

>>>>>>> c27180486b6d666bb0e2f5d12a7552cfb4d11859
