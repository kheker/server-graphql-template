import TodoChainResolvers from './todoChain-resolvers';
import TodoResolvers from './todo-resolvers';
import UserResovers from './user-resolver';

export default {
  Query: {
    getTodoChain: TodoChainResolvers.getTodoChain,
    getTodoChains: TodoChainResolvers.getTodoChains,
    getTodo: TodoResolvers.getTodo,
    getTodos: TodoResolvers.getTodos,
  },
  Mutation: {
    createTodo: TodoResolvers.createTodo,
    updateTodo: TodoResolvers.updateTodo,
    createTodoChain: TodoChainResolvers.createTodoChain,
    updateTodoChain: TodoChainResolvers.updateTodoChain,
    signup: UserResovers.signup,
    login: UserResovers.login,
  },
  TodoChain: {
    todos: TodoResolvers.getTodoChainTodos,
  },
};
