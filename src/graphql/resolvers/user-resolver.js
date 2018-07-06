import User from '../../models/User';
import constants from '../../config/constants';
import { createTokens } from '../../config/auth';

export default {
  signup: async (_, { fullName, email, username, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ');
    const userEmail = await User.findOne({ email });
    const userExist = await User.findOne({ username });

    if (userEmail) {
      return {
        ok: false,
        errors: [{ path: 'email', message: 'This email exist' }],
      };
    }

    if (userExist) {
      return {
        ok: false,
        errors: [{ path: 'email', message: 'This username already taken' }],
      };
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      ...rest,
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
    };
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
