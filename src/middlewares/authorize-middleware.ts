import { NextFunction, Request, Response } from 'express';
import { ThrowException } from '../exceptions/throw-exception';
import { UserRole } from '../modules/user/user.model';

export const authorizeMiddleware = (...roles: UserRole[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      ThrowException.unAuthorized(
        'You are not authorized to perform this action'
      );
    }
  };
};
