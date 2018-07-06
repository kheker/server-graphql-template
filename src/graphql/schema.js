export default `
  type User {
    _id: ID!
    email: String!
    username: String!
    firstName: String
    lastName: String
  }

  type Auth {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type TodoChain {
    _id: ID!
    title: String!
    todos: [Todo]
  }

  type Todo {
    _id: ID!
    todoChain: ID!
    name: String!
  }

  type Error {
    path: String!
    message: String
  }

  type Query {
    getTodoChain(_id: ID!): TodoChain
    getTodoChains: [TodoChain]
    getTodo(_id: ID!): Todo
    getTodos: [Todo]
  }

  type Mutation {
    createTodoChain(title: String!): TodoChain
    updateTodoChain(_id: ID!, title: String) : TodoChain
    createTodo(name: String!, todoChain: ID!): Todo
    updateTodo(_id: ID!, name: String): Todo
    signup(email: String!,username: String!, password: String!, fullName: String!): Auth
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
