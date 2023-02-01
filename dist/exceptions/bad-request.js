"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_exception_1 = require("./custom-exception");
class BadRequestException extends custom_exception_1.CustomException {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        this.message = message;
    }
}
exports.BadRequestException = BadRequestException;