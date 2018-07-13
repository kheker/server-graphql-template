import List from '../../models/List';
import { RequireAuth } from '../../config/auth';

export default {
  getList: (_, { _id }) => List.findById(_id),
  getLists: () => List.find({}),
  getCardLists: ({ _id }) => List.find({ card: _id }),
  createList: async (_, args, { user }) => {
    await RequireAuth(user);
    return List.create(args);
  },
  updateList: async (_, { _id, ...rest }, { user }) => {
    await RequireAuth(user);
    return List.findByIdAndUpdate(_id, rest, { new: true });
  },
};
