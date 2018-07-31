import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import User from '../models/User';

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: pick(user, ['id', 'username']),
    },
    secret,
    {
      expiresIn: '1m',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, SECRET, SECRET2) => {
  let userId = 0;
  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await User.findById(userId);

  if (!user) {
    return {};
  }

  const refreshSecret = `${user.password}${SECRET2}`;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    refreshSecret,
  );

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};
