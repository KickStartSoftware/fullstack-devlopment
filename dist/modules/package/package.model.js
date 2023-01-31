"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGE = exports.PACKAGE_SCHEMA = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.PACKAGE_SCHEMA = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, 'Package name is required'],
        minlength: [4, 'Package name cannot be less than 4 characters'],
        maxlength: [30, 'Package name cannot be more than 30 characters'],
    },
    category: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'CATEGORY',
        required: [true, 'category is required'],
    },
    numberOfDownloads: {
        type: Number,
        default: 0,
        min: [0, 'Number of downloads cannot be less than 0'],
    },
    win32url: {
        type: String,
        default: null,
    },
    win64url: {
        type: String,
        default: null,
    },
    iconUrl: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
});
exports.PACKAGE = mongoose_1.default.model('PACKAGE', exports.PACKAGE_SCHEMA);
