"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadQueryDto = exports.DownloadDto = void 0;
class DownloadDto {
    constructor({ packageIds }) {
        this.packageIds = Array.isArray(packageIds) ? packageIds : [];
    }
}
exports.DownloadDto = DownloadDto;
class DownloadQueryDto {
    constructor({ userId }) {
        this.userId = userId || '';
    }
}
exports.DownloadQueryDto = DownloadQueryDto;
