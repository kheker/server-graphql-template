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
      return List.create(args);
    } catch (e) {
      return {
        errors: formatErrors(e),
      };
    }
  },
  updateList: async (_, { _id, teamId, ...rest }, { user }) => {
    try {
      await memberPermision(user, teamId);
      return List.findByIdAndUpdate(_id, rest, { new: true });
    } catch (e) {
      return {
        errors: formatErrors(e),
      };
    }
  },
};
