"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageDto = void 0;
class PackageDto {
    constructor({ name, category, win32url, win64url, numberOfDownloads }) {
        this.name = name || '';
        this.category = category || '';
        this.win32url = win32url || null;
        this.win64url = win64url || null;
        this.numberOfDownloads = numberOfDownloads ? Number(numberOfDownloads) : 0;
    }
}
exports.PackageDto = PackageDto;
