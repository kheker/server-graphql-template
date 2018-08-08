import Card from '../../models/Card';
import Team from '../../models/Team';
import Member from '../../models/Members';
import { RequireAuth } from '../../config/auth';
import formatErrors from '../../config/formatError';

export default {
  getCard: (_, { _id }) => Card.findById(_id),
  getPublicCards: () =>
    Card.find({
      public: true,
    }),
  /* getPrivateCards: async ({ user }) => {
    await RequireAuth(user);
    return Card.find({ owner: user.id, public: false });
  }, */
  getMyCards: async (_, args, { user }) => {
    await RequireAuth(user);
    return Card.find({
      owner: user.id,
    });
  },
  createCard: async (_, args, { user }) => {
    try {
      const me = await RequireAuth(user);
      const card = await Card.create({
        owner: me._id,
        ...args,
      });
      const team = await Team.create({
        name: 'General',
        card: card._id,
      });
      await Member.create({
        role: 'admin',
        user: me._id,
        team: team._id,
      });
      return { ok: true, card };
    } catch (e) {
      // throw new Error(e);
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
  updateCard: async (_, { _id, ...rest }, { user }) => {
    await RequireAuth(user);
    return Card.findByIdAndUpdate(_id, rest, {
      new: true,
    });
  },
};
