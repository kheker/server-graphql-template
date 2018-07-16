import Member from '../../models/Members';
import User from '../../models/User';
import formatErrors from '../../config/formatError';
import { memberPermision } from '../../config/permisions';

export default {
  addMember: async (_, { userId, teamId }, { user }) => {
    try {
      await memberPermision(user, teamId);
      return Member.create({ user: userId, team: teamId, role: 'observer' });
    } catch (e) {
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
  usersMember: async (parent, args, { user }) => {
    try {
      const member = await User.findById(parent.user);
      return member;
    } catch (e) {
      throw e;
    }
  },
  updateMember: async (_, { role, memberId, teamId }, { user }) => {
    try {
      await memberPermision(user, teamId);
      return Member.findByIdAndUpdate(memberId, role, { new: true });
    } catch (e) {
      throw e;
    }
  },
};
