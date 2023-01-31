import { Request, Response, NextFunction } from 'express';
import { Utils } from '../util';
import { ThrowException } from '../exceptions/throw-exception';
import { UserPayload } from '../modules/user/user.model';

// Verify token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    ThrowException.unAuthenticated('Token is required');
  }

  try {
    const decoded = Utils.verifyToken(token!.split(' ')[1]) as UserPayload;
    req.user = {
      email: decoded.email,
      role: decoded.role,
      id: decoded.id,
      isVerified: decoded.isVerified,
    };
    next();
  } catch (err) {
    ThrowException.unAuthenticated('Invalid token');
  }
};
