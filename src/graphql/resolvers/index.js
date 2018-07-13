import CardResolvers from './card-resolvers';
import ListResolvers from './list-resolvers';
import UserResovers from './user-resolver';
import TeamResolvers from './team-resolvers';
import MemberResolvers from './member-resolvers';

export default {
  Query: {
    getCard: CardResolvers.getCard,
    getPublicCards: CardResolvers.getPublicCards,
    getMyCards: CardResolvers.getMyCards,
    getList: ListResolvers.getList,
    getLists: ListResolvers.getLists,
    me: UserResovers.me,
  },
  Mutation: {
    createList: ListResolvers.createList,
    updateList: ListResolvers.updateList,
    createCard: CardResolvers.createCard,
    updateCard: CardResolvers.updateCard,
    addMember: MemberResolvers.addMember,
    signup: UserResovers.signup,
    login: UserResovers.login,
  },
  Card: {
    owner: UserResovers.getOwner,
    team: TeamResolvers.getCardTeam,
  },
  Member: {
    user: MemberResolvers.usersMember,
  },
};
