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
const package_model_js_1 = require("./modules/package/package.model.js");
const start = async () => {
    try {
        await (0, connect_db_js_1.connectDB)(config_js_1.config.mongo_uri);
        await package_model_js_1.PACKAGE.deleteMany();
        const jsonPath = path_1.default.join(process.cwd(), '/json/softwares.json');
        const softwares = JSON.parse(await (0, promises_1.readFile)(jsonPath, 'utf8'));
        await package_model_js_1.PACKAGE.create(softwares);
        console.log('Success!!!');
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
