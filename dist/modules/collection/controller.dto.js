"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionDto = void 0;
class CollectionDto {
    constructor({ userId, name, packageIds }) {
        this.name = name;
        this.userId = userId;
        this.packageIds = Array.isArray(packageIds) ? packageIds : [];
    }
    constructQuery() {
        const query = {};
        // search by userId
        if (this.userId) {
            query.user = this.userId;
        }
        // search by name
        if (this.name) {
            query.name = {
                $regex: this.name,
                $options: 'i',
            };
        }
        // search by package
        if (this.packageIds.length > 0) {
            query.packages = { $all: this.packageIds };
        }
        return query;
    }
}
exports.CollectionDto = CollectionDto;
