import Member from '../models/Members';

export const adminPermision = async (user, cardOwner) => {
  if (!user || !user.id) {
    throw new Error('Unauthorized!');
  }

  if (user.id !== cardOwner) {
    throw new Error('Unauthorized!');
  }
};

export const memberPermision = async (user, teamId) => {
  if (!user || !user.id) {
    throw new Error('Unauthorized!');
  }
  const member = await Member.findOne({ user: user.id, team: teamId });
  if (!member) {
    throw new Error('Unauthorized!');
  }
  /*
  if (member.role !== 'admin' || member.role !== 'moderator') {
    throw new Error('Unauthorized!');
  }
  */
};
