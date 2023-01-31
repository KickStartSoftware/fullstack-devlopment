"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const auth_dto_1 = require("../auth/auth.dto");
class UserDto extends auth_dto_1.AuthDto {
    constructor({ role, email, password }) {
        super({ email, password });
        this.role = role;
    }
}
exports.UserDto = UserDto;
