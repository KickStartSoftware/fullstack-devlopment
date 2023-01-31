"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const config_js_1 = require("./config.js");
const promises_1 = require("fs/promises");
const connect_db_js_1 = require("./connect.db.js");
const category_model_js_1 = require("./modules/category/category.model.js");
const start = async () => {
    try {
        await (0, connect_db_js_1.connectDB)(config_js_1.config.mongo_uri);
        await category_model_js_1.CATEGORY.deleteMany();
        const jsonPath = path_1.default.join(process.cwd(), '/json/categories.json');
        const categories = JSON.parse(await (0, promises_1.readFile)(jsonPath, 'utf8'));
        await category_model_js_1.CATEGORY.create(categories);
        console.log('Success!!!');
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
