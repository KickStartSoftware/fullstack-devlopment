"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER = exports.UserRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
const USER_SCHEMA = new mongoose_1.default.Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide your email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Please provide your username'],
        minlength: [4, 'username must be longer than 4 characters'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [6, 'password cannot be less than 6 characters'],
    },
    role: {
        type: String,
        enum: {
            values: [UserRole.ADMIN, UserRole.USER],
            message: 'Invalid user role',
        },
        default: UserRole.USER,
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifiedDate: Date,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
}, {
    timestamps: true,
});
// index db with email and username
USER_SCHEMA.index({ email: 1, username: 1 }, { unique: true });
USER_SCHEMA.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
USER_SCHEMA.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcryptjs_1.default.compare(canditatePassword, this.password);
    return isMatch;
};
exports.USER = mongoose_1.default.model('USER', USER_SCHEMA);
