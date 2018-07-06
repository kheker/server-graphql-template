import User from '../../models/User';
import constants from '../../config/constants';
import { createTokens } from '../../config/auth';

export default {
  signup: (_, { fullName, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ');
    return User.create({ firstName, lastName, ...rest });
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        ok: false,
        errors: [{ path: 'email', message: 'Invalid credentials' }],
      };
    }

    if (!user.authenticate(password)) {
      return {
        ok: false,
        errors: [{ path: 'password', message: 'Invalid credentials' }],
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
  },
};
