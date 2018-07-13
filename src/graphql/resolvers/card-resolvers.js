import Card from '../../models/Card';
import Team from '../../models/Team';
import Member from '../../models/Members';
import { RequireAuth } from '../../config/auth';
import formatErrors from '../../config/formatError';

export default {
  getCard: (_, { _id }) => Card.findById(_id),
  getPublicCards: () => Card.find({ public: true }),
  /* getPrivateCards: async ({ user }) => {
    await RequireAuth(user);
    return Card.find({ owner: user.id, public: false });
  },*/
  getMyCards: async (_, args, { user }) => {
    await RequireAuth(user);
    return Card.find({ owner: user.id });
  },
  createCard: async (_, args, { user }) => {
    try {
      await RequireAuth(user);
      const card = await Card.create({ owner: user.id, ...args });
      const team = await Team.create({ name: 'General', card: card._id });
      await Member.create({ role: 'admin', user: user.id, team: team._id });
      return card;
    } catch (e) {
      return {
        errors: formatErrors(e),
      };
    }
  },
  updateCard: async (_, { _id, ...rest }, { user }) => {
    await RequireAuth(user);
    return Card.findByIdAndUpdate(_id, rest, { new: true });
  },
};
