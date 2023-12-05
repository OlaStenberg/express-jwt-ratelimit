
import jwt from 'jsonwebtoken';
import { User } from './types';

export function generateToken(user: User, secret: string) {
  const token = jwt.sign(
    {
      id: user.id,
      roles: user.roles,
      rateLimit: user.rateLimit
    },
    secret
  );
  return token;
}
