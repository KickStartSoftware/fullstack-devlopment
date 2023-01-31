"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOWNLOAD = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DOWNLOAD_SCHEMA = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'USER',
        default: null,
    },
    package: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'PACKAGE',
        required: [true, 'package id is required'],
    },
}, {
    timestamps: true,
});
DOWNLOAD_SCHEMA.post('save', async function () {
    const packageId = this.package;
    const software = await this.$model('PACKAGE').findById(packageId);
    if (software) {
        software.numberOfDownloads = software.numberOfDownloads + 1;
        await software.save();
    }
});
exports.DOWNLOAD = mongoose_1.default.model('DOWNLOAD', DOWNLOAD_SCHEMA);
