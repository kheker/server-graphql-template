import Team from '../../models/Team';
// import User from '../../models/User';
import Member from '../../models/Members';
import formatErrors from '../../config/formatError';

export default {
  getCardTeam: async ({ _id }, _, { user }) => {
    try {
      const team = await Team.findOne({ card: _id });
      const members = await Member.find({ team: team._id });
      return {
        _id: team._id,
        name: team.name,
        members,
      };
    } catch (e) {
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
};
