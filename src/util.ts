import crypto from 'crypto';
import { config } from './config';
import jsonwebtoken from 'jsonwebtoken';
import { UserPayload, UserRole } from './modules/user/user.model';
import { ObjectId } from 'mongoose';
import { ThrowException } from './exceptions/throw-exception';

export class Utils {
  static isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  private static generateCryptoToken() {
    return crypto.randomBytes(70).toString('hex');
  }

  static generatePayload(user: any): UserPayload {
    return {
      id: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
      isVerified: user.isVerified,
    };
  }

  static createHash(token: string) {
    return crypto.createHash('md5').update(token).digest('hex');
  }

  static createExpiryDate(minutes: number = 10) {
    return new Date(Date.now() + 1000 * 60 * minutes);
  }

  static createHashToken() {
    const token = this.generateCryptoToken();
    const hash = this.createHash(token);
    return {
      token,
      hash,
    };
  }

  static generateToken = (user: any) => {
    const payload = this.generatePayload(user);
    const options = {
      expiresIn: config.token_lifetime,
    };
    return jsonwebtoken.sign(payload, config.token_secret!, options);
  };

  static verifyToken(token: string) {
    return jsonwebtoken.verify(token, config.token_secret!);
  }

  static checkOwner(
    requestUser: UserPayload,
    resourceId: any,
    message = 'You are not authorized to do this'
  ) {
    if (requestUser.role === UserRole.ADMIN) return;
    if (requestUser.id === resourceId.toString()) return;
    ThrowException.unAuthorized(message);
  }

  static paginationQuery(count: number, limit: any = '20', page: any = '1') {
    const skip = (Number(page) - 1) * Number(limit);

    return {
      page: Number(page),
      limit: Number(limit),
      skip,
      total: count,
      lastPage: Math.ceil(count / Number(limit)),
    };
  }

  static generatePaginationInfo(pagination: any) {
    return {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      lastPage: pagination.lastPage,
    };
  }
}
