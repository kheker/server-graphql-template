import List from '../../models/List';
// import { RequireAuth } from '../../config/auth';
import { memberPermision } from '../../config/permisions';
import formatErrors from '../../config/formatError';

export default {
  getList: (_, { _id }) => List.findById(_id),
  getCardLists: ({ _id }) => List.find({ card: _id }),
  createList: async (_, { teamId, ...args }, { user }) => {
    try {
      await memberPermision(user, teamId);
      const list = await List.create(args);
      return { ok: true, list };
    } catch (e) {
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
  updateList: async (_, { _id, teamId, ...rest }, { user }) => {
    try {
      await memberPermision(user, teamId);
      const list = await List.findByIdAndUpdate(_id, rest, { new: true });
      return { ok: true, list };
    } catch (e) {
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
};
