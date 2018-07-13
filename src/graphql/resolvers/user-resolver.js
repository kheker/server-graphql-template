import User from '../../models/User';
import constants from '../../config/constants';
import { createTokens, RequireAuth } from '../../config/auth';
import formatErrors from '../../config/formatError';

export default {
  signup: async (_, { fullName, email, username, password }) => {
    const [firstName, ...lastName] = fullName.split(' ');

    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        password,
      });
      const refreshTokenSecret = user.password + constants.SECRET2;

      const [token, refreshToken] = await createTokens(
        user,
        constants.SECRET,
        refreshTokenSecret,
      );

      return {
        ok: true,
        token,
        refreshToken,
        errors: null,
      };
    } catch (err) {
      return {
        ok: false,
        token: null,
        refreshToken: null,
        errors: formatErrors(err),
      };
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          ok: false,
          errors: [{ path: 'login', message: 'Invalid credentials' }],
        };
      }

      if (!user.authenticate(password)) {
        return {
          ok: false,
          errors: [{ path: 'login', message: 'Invalid credentials' }],
        };
      }

      const refreshTokenSecret = user.password + constants.SECRET2;

      const [token, refreshToken] = await createTokens(
        user,
        constants.SECRET,
        refreshTokenSecret,
      );

      return {
        ok: true,
        token,
        refreshToken,
      };
    } catch (e) {
      throw e;
    }
  },
  getOwner: ({ owner }) => User.findById({ _id: owner }),
  me: async (_, args, { user }) => {
    try {
      const me = await RequireAuth(user);
      return me;
    } catch (e) {
      throw e;
    }
  },
};
