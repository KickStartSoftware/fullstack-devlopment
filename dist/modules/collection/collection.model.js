"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLECTION = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const package_model_1 = require("../package/package.model");
const COLLECTION_SCHEMA = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'USER',
        required: [true, 'Please provide a user for this collection'],
    },
    name: {
        type: String,
        trim: true,
        require: [true, 'Collection name is required'],
        minlength: [4, 'Collection name cannot be less than 4 characters'],
        maxlength: [30, 'Collection name cannot be more than 30 characters'],
    },
    packages: [package_model_1.PACKAGE_SCHEMA],
}, {
    timestamps: true,
});
COLLECTION_SCHEMA.index({ user: 1, name: 1 }, { unique: true });
exports.COLLECTION = mongoose_1.default.model('COLLECTION', COLLECTION_SCHEMA);
