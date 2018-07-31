export default `
  scalar Date

  type User {
    _id: ID!
    email: String!
    username: String!
    avatar: String
    firstName: String
    lastName: String
  }

  type Auth {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Me {
    _id: ID!
    email: String!
    username: String!
    avatar: String
    firstName: String
    lastName: String
  }

  type Card {
    _id: ID!
    name: String!
    public: Boolean!
    owner: User!
    team: Team
    lists: [List!]
    ok: Boolean
    errors: [Error!]
  }

  type Team {
    _id: ID!
    name: String!
    members: [Member]
    errors: [Error!]
  }

  type Member {
    _id : ID!
    role: String!
    user: User
    errors: [Error!]
  }

  type List {
    _id: ID!
    card: ID!
    name: String!
    description: String
    file: String
    expirationDate: Date
    createdAt: Date
    updatedAt: Date
    errors: [Error!]
  }

  type Task {
    _Id : ID!
    name: String!
    description: String
    status: String
    expirationDate: Date
    subTask: [subTask!]
    createdAt: Date
    updatedAt: Date
    ok: Boolean
    errors: [Error!]
  }

  type subTask {
    name: String
    completed: Boolean
  }

  type Error {
    path: String
    message: String
  }

  type Query {
    getCard(_id: ID!): Card
    getPublicCards: [Card]
    getMyCards: [Card]
    getList(_id: ID!): List
    me: Me
  }

  type Mutation {
    createCard(name: String!, public: Boolean): Card
    updateCard(_id: ID!, title: String) : Card
    createList(name: String!,teamId: ID!, card: ID!, description: String): List
    updateList(_id: ID!, teamId: ID!, name: String, description: String, expirationDate: Date, file: String): List
    createTask(listId: ID!, teamId: ID!, name: String!, description: String, expirationDate: Date, status: String): Task
    updateTask(_id: ID!, teamId:ID!, listId: ID!, name: String, description: String, expirationDate: Date, status: String): Task
    addSubTask(_id: ID!,teamId: ID!, name: String!, completed: Boolean): Task
    addMember(userId: ID!, teamId: ID!): Member
    updateMember(role: String, memberId: ID!, teamId: ID!): Member
    signup(email: String!,username: String!, password: String!, fullName: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(avatar: String): Me
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
