"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMe = exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const util_1 = require("../../util");
const http_status_codes_1 = require("http-status-codes");
const throw_exception_1 = require("../../exceptions/throw-exception");
const auth_dto_1 = require("./auth.dto");
const email_service_1 = require("../../services/email/email.service");
const user_model_1 = require("../user/user.model");
// register user
const registerUser = async (req, res) => {
    const authDto = new auth_dto_1.AuthDto(req.body);
    console.log(authDto, req.body);
    if (!authDto.email || !authDto.password || !authDto.username) {
        throw_exception_1.ThrowException.badRequest('Email and password and username is required');
    }
    const existingUser = await user_model_1.USER.findOne({ email: authDto.email });
    if (existingUser) {
        throw_exception_1.ThrowException.badRequest('user already exist');
    }
    const user = await user_model_1.USER.create({
        ...authDto,
        role: user_model_1.UserRole.USER,
    });
    const token = util_1.Utils.generateToken(user);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ token, user: util_1.Utils.generatePayload(user) });
};
exports.registerUser = registerUser;
// login
const loginUser = async (req, res) => {
    const authDto = new auth_dto_1.AuthDto(req.body);
    if (!authDto.email || !authDto.password) {
        throw_exception_1.ThrowException.badRequest('Email and password is required');
    }
    const user = await user_model_1.USER.findOne({ email: authDto.email });
    if (!user) {
        throw_exception_1.ThrowException.unAuthenticated('invalid credentials');
    }
    const isCorrectPassword = await user.comparePassword(authDto.password);
    if (!isCorrectPassword) {
        throw_exception_1.ThrowException.unAuthenticated('invalid credentials');
    }
    const token = util_1.Utils.generateToken(user);
    res.status(http_status_codes_1.StatusCodes.OK).json({ token, user: util_1.Utils.generatePayload(user) });
};
exports.loginUser = loginUser;
// forgot-password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw_exception_1.ThrowException.badRequest('email is required');
    }
    const user = await user_model_1.USER.findOne({ email });
    if (user) {
        const currentDate = new Date();
        if (user.passwordToken &&
            user.passwordTokenExpirationDate.getTime() > currentDate.getTime()) {
            throw_exception_1.ThrowException.badRequest('Resend token after 10 miniutes');
        }
        else {
            const emailService = new email_service_1.EmailService();
            const { token, hash } = util_1.Utils.createHashToken();
            const expiryDate = util_1.Utils.createExpiryDate();
            const emailDto = {
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
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link' });
};
exports.forgotPassword = forgotPassword;
// reset-password
const resetPassword = async (req, res) => {
    const { token, email, password } = new auth_dto_1.AuthResetPasswordDto(req.body);
    if (!token || !email || !password) {
        throw_exception_1.ThrowException.badRequest('provide all values');
    }
    const user = await user_model_1.USER.findOne({ email });
    if (user) {
        const currentDate = new Date();
        if (user.passwordToken === util_1.Utils.createHash(token) &&
            user.passwordTokenExpirationDate.getTime() > currentDate.getTime()) {
            user.password = password;
            user.passwordToken = null;
            user.passwordTokenExpirationDate = null;
            await user.save();
        }
        else {
            const tokenExpired = !Boolean(user.passwordTokenExpirationDate.getTime() > currentDate.getTime());
            throw_exception_1.ThrowException.unAuthenticated(tokenExpired ? 'Token expired' : 'Invalid Token');
        }
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'Password reset successful',
    });
};
exports.resetPassword = resetPassword;
// show me
const showMe = async (req, res) => {
    const user = req.user;
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
};
exports.showMe = showMe;
