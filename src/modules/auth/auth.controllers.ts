import { Request, Response } from 'express';
import { Utils } from '../../util';
import { StatusCodes } from 'http-status-codes';
import { ThrowException } from '../../exceptions/throw-exception';
import { AuthDto, AuthResetPasswordDto } from './auth.dto';
import { VerificationEmailDto } from '../../services/email/email.dto';
import { EmailService } from '../../services/email/email.service';
import { USER, UserRole } from '../user/user.model';

// register user
export const registerUser = async (req: Request, res: Response) => {
  const authDto = new AuthDto(req.body);
  console.log(authDto, req.body);
  if (!authDto.email || !authDto.password || !authDto.username) {
    ThrowException.badRequest('Email and password and username is required');
  }

  const existingUser = await USER.findOne({ email: authDto.email });
  if (existingUser) {
    ThrowException.badRequest('user already exist');
  }

  const user = await USER.create({
    ...authDto,
    role: UserRole.USER,
  });
  const token = Utils.generateToken(user);
  res
    .status(StatusCodes.CREATED)
    .json({ token, user: Utils.generatePayload(user) });
};

// login
export const loginUser = async (req: Request, res: Response) => {
  const authDto = new AuthDto(req.body);
  if (!authDto.email || !authDto.password) {
    ThrowException.badRequest('Email and password is required');
  }

  const user = await USER.findOne({ email: authDto.email });
  if (!user) {
    ThrowException.unAuthenticated('invalid credentials');
  }

  const isCorrectPassword = await user!.comparePassword(authDto.password);
  if (!isCorrectPassword) {
    ThrowException.unAuthenticated('invalid credentials');
  }
  const token = Utils.generateToken(user);
  res.status(StatusCodes.OK).json({ token, user: Utils.generatePayload(user) });
};

// forgot-password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    ThrowException.badRequest('email is required');
  }

  const user = await USER.findOne({ email });
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken &&
      user!.passwordTokenExpirationDate!.getTime() > currentDate.getTime()
    ) {
      ThrowException.badRequest('Resend token after 10 miniutes');
    } else {
      const emailService = new EmailService();
      const { token, hash } = Utils.createHashToken();
      const expiryDate = Utils.createExpiryDate();
      const emailDto: VerificationEmailDto = {
        email,
        token,
      };
      await emailService.sendPasswordResetEmail(emailDto);
      user.passwordToken = hash;
      user.passwordTokenExpirationDate = expiryDate;
      await user.save();
    }
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' });
};

// reset-password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, email, password } = new AuthResetPasswordDto(req.body);
  if (!token || !email || !password) {
    ThrowException.badRequest('provide all values');
  }
  const user = await USER.findOne({ email });
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === Utils.createHash(token) &&
      user!.passwordTokenExpirationDate!.getTime() > currentDate.getTime()
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    } else {
      const tokenExpired = !Boolean(
        user!.passwordTokenExpirationDate!.getTime() > currentDate.getTime()
      );
      ThrowException.unAuthenticated(
        tokenExpired ? 'Token expired' : 'Invalid Token'
      );
    }
  }
  res.status(StatusCodes.OK).json({
    message: 'Password reset successful',
  });
};

// show me
export const showMe = async (req: Request, res: Response) => {
  const user = req.user;
  res.status(StatusCodes.OK).json(user);
};
