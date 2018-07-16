import GraphQLDate from 'graphql-date';
import CardResolvers from './card-resolvers';
import ListResolvers from './list-resolvers';
import UserResovers from './user-resolver';
import TeamResolvers from './team-resolvers';
import MemberResolvers from './member-resolvers';

export default {
  Date: GraphQLDate,
  Query: {
    getCard: CardResolvers.getCard,
    getPublicCards: CardResolvers.getPublicCards,
    getMyCards: CardResolvers.getMyCards,
    getList: ListResolvers.getList,
    me: UserResovers.me,
  },
  Mutation: {
    createList: ListResolvers.createList,
    updateList: ListResolvers.updateList,
    createCard: CardResolvers.createCard,
    updateCard: CardResolvers.updateCard,
    addMember: MemberResolvers.addMember,
    updateMember: MemberResolvers.updateMember,
    signup: UserResovers.signup,
    login: UserResovers.login,
    updateUser: UserResovers.updateUser,
  },
  Card: {
    owner: UserResovers.getOwner,
    team: TeamResolvers.getCardTeam,
    lists: ListResolvers.getCardLists,
  },
  Member: {
    user: MemberResolvers.usersMember,
  },
};
