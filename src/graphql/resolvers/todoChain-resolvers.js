import TodoChain from '../../models/TodoChain';
import { RequireAuth } from '../../config/permisions';

export default {
  getTodoChain: (_, { _id }) => TodoChain.findById(_id),
  getTodoChains: () => TodoChain.find({}),
  createTodoChain: async (_, args, { user }) => {
    await RequireAuth(user);
    return TodoChain.create(args);
  },
  updateTodoChain: async (_, { _id, ...rest }, { user }) => {
    await RequireAuth(user);
    return TodoChain.findByIdAndUpdate(_id, rest, { new: true });
  },
};
