import { Request, Response } from 'express';
import { Utils } from '../../util';
import { StatusCodes } from 'http-status-codes';
import { ThrowException } from '../../exceptions/throw-exception';
import { USER } from '../user/user.model';
import { UserDto } from './user.dto';

// count users
export const countUsers = async (req: Request, res: Response) => {
  const count = await USER.count({});
  return res.status(StatusCodes.OK).json({ count });
};

// create users
export const createUser = async (req: Request, res: Response) => {
  const userDto = new UserDto(req.body);
  const { email, password, role } = userDto;

  if (!email || !password || !role) {
    ThrowException.badRequest('Email,password and role is required');
  }

  const existingUser = await USER.findOne({ email });
  if (existingUser) {
    ThrowException.badRequest('user already exist');
  }

  const user = await USER.create(userDto);
  res.status(StatusCodes.CREATED).json({ user });
};

// get users
export const getAllUsers = async (req: Request, res: Response) => {
  const count = await USER.count({});
  const results = USER.find({});

  const { page, limit } = req.query;
  const pagination = Utils.paginationQuery(count, limit, page);
  const users = await results
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort('-createdAt');
  return res.status(StatusCodes.OK).json({
    pagination: Utils.generatePaginationInfo(pagination),
    data: users,
  });
};

// getSingle user
export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userPayload = req.user;
  const user = await USER.findById(id);
  if (!user) {
    ThrowException.notFound(`No user with id:${id}`);
  }

  Utils.checkOwner(userPayload, user!._id);
  return res.status(StatusCodes.OK).json(user);
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userPayload = req.user;
  const user = await USER.findById(id);
  if (!user) {
    ThrowException.notFound(`No user with id:${id}`);
  }

  Utils.checkOwner(userPayload, user!._id);
  // do some user update here
  await user!.save();
  const token = Utils.generateToken(user);
  res.status(StatusCodes.OK).json({ user, token });
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userPayload = req.user;
  const user = await USER.findById(id);
  if (!user) {
    ThrowException.notFound(`No user with id:${id}`);
  }
  await user?.remove();
  res.status(StatusCodes.NO_CONTENT).send();
};
