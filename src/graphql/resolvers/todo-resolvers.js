import Todo from '../../models/Todo';
import { RequireAuth } from '../../config/permisions';

export default {
  getTodo: (_, { _id }) => Todo.findById(_id),
  getTodos: () => Todo.find({}),
  getTodoChainTodos: ({ _id }) => Todo.find({ todoChain: _id }),
  createTodo: async (_, args, { user }) => {
    await RequireAuth(user);
    return Todo.create(args);
  },
  updateTodo: async (_, { _id, ...rest }, { user }) => {
    await RequireAuth(user);
    return Todo.findByIdAndUpdate(_id, rest, { new: true });
  },
};
