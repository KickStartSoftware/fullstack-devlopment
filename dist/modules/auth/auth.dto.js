"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResetPasswordDto = exports.AuthDto = void 0;
class AuthDto {
    constructor({ email, password, username }) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}
exports.AuthDto = AuthDto;
class AuthResetPasswordDto {
    constructor({ email, password, token }) {
        this.email = email;
        this.token = token;
        this.password = password;
    }
}
exports.AuthResetPasswordDto = AuthResetPasswordDto;
