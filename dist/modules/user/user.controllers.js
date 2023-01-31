"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = exports.createUser = exports.countUsers = void 0;
const util_1 = require("../../util");
const http_status_codes_1 = require("http-status-codes");
const throw_exception_1 = require("../../exceptions/throw-exception");
const user_model_1 = require("../user/user.model");
const user_dto_1 = require("./user.dto");
// count users
const countUsers = async (req, res) => {
    const count = await user_model_1.USER.count({});
    return res.status(http_status_codes_1.StatusCodes.OK).json({ count });
};
exports.countUsers = countUsers;
// create users
const createUser = async (req, res) => {
    const userDto = new user_dto_1.UserDto(req.body);
    const { email, password, role } = userDto;
    if (!email || !password || !role) {
        throw_exception_1.ThrowException.badRequest('Email,password and role is required');
    }
    const existingUser = await user_model_1.USER.findOne({ email });
    if (existingUser) {
        throw_exception_1.ThrowException.badRequest('user already exist');
    }
    const user = await user_model_1.USER.create(userDto);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user });
};
exports.createUser = createUser;
// get users
const getAllUsers = async (req, res) => {
    const count = await user_model_1.USER.count({});
    const results = user_model_1.USER.find({});
    const { page, limit } = req.query;
    const pagination = util_1.Utils.paginationQuery(count, limit, page);
    const users = await results
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort('-createdAt');
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        pagination: util_1.Utils.generatePaginationInfo(pagination),
        data: users,
    });
};
exports.getAllUsers = getAllUsers;
// getSingle user
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const userPayload = req.user;
    const user = await user_model_1.USER.findById(id);
    if (!user) {
        throw_exception_1.ThrowException.notFound(`No user with id:${id}`);
    }
    util_1.Utils.checkOwner(userPayload, user._id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(user);
};
exports.getSingleUser = getSingleUser;
// update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const userPayload = req.user;
    const user = await user_model_1.USER.findById(id);
    if (!user) {
        throw_exception_1.ThrowException.notFound(`No user with id:${id}`);
    }
    util_1.Utils.checkOwner(userPayload, user._id);
    // do some user update here
    await user.save();
    const token = util_1.Utils.generateToken(user);
    res.status(http_status_codes_1.StatusCodes.OK).json({ user, token });
};
exports.updateUser = updateUser;
// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userPayload = req.user;
    const user = await user_model_1.USER.findById(id);
    if (!user) {
        throw_exception_1.ThrowException.notFound(`No user with id:${id}`);
    }
    await (user === null || user === void 0 ? void 0 : user.remove());
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
};
exports.deleteUser = deleteUser;
