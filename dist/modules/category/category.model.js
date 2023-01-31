"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CATEGORY_SCHEMA = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        require: [true, 'Category name is required'],
        minlength: [4, 'Category name cannot be less than 4 characters'],
        maxlength: [30, 'Category name cannot be more than 30 characters'],
    },
}, {
    timestamps: true,
});
exports.CATEGORY = mongoose_1.default.model('CATEGORY', CATEGORY_SCHEMA);
