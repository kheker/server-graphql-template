export default `
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
    getLists: [List]
    me: Me
  }

  type Mutation {
    createCard(name: String!, public: Boolean): Card
    updateCard(_id: ID!, title: String) : Card
    createList(name: String!, card: ID!): List
    updateList(_id: ID!, name: String): List
    addMember(userId: ID!, teamId: ID!): Member
    signup(email: String!,username: String!, password: String!, fullName: String!): Auth
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
