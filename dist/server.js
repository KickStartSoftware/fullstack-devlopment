"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const config_1 = require("./config");
const body_parser_1 = __importDefault(require("body-parser"));
const connect_db_1 = require("./connect.db");
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_service_1 = require("./services/logger.service");
// routers
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const collection_routes_1 = __importDefault(require("./modules/collection/collection.routes"));
const download_routes_1 = __importDefault(require("./modules/download/download.routes"));
const package_routes_1 = __importDefault(require("./modules/package/package.routes"));
const category_routes_1 = __importDefault(require("./modules/category/category.routes"));
const analytic_routes_1 = __importDefault(require("./modules/analytic/analytic.routes"));
// middlewares
const not_found_1 = require("./middlewares/not-found");
const error_handler_1 = require("./middlewares/error-handler");
const app = (0, express_1.default)();
const baseApiUrl = '/api/v1';
const authUrl = '/api/v1/auth';
// security middleware
app.use((0, xss_clean_1.default)());
app.use((0, cors_1.default)());
app.options('*', cors_1.default); // allow all request options by cors
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 600, //  60 request max
}));
app.use((0, helmet_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.set('trust proxy', 1);
// utility middlewares
process.env.NODE_ENV !== 'production' && app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static('./public'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// routes
app.use(`${authUrl}`, auth_routes_1.default);
app.use(`${baseApiUrl}/users`, user_routes_1.default);
app.use(`${baseApiUrl}/categories`, category_routes_1.default);
app.use(`${baseApiUrl}/packages`, package_routes_1.default);
app.use(`${baseApiUrl}/downloads`, download_routes_1.default);
app.use(`${baseApiUrl}/collections`, collection_routes_1.default);
app.use(`${baseApiUrl}/analytics`, analytic_routes_1.default);
// error handlers
app.use(not_found_1.notFoundMiddleware);
app.use(error_handler_1.errorHandlerMiddleware);
const start = async () => {
    const { server_port, mongo_uri } = config_1.config;
    const logger = logger_service_1.Logger.getInstance();
    try {
        logger.log(`Connecting to database...`);
        await (0, connect_db_1.connectDB)(mongo_uri);
        app.listen(server_port, () => logger.log(`Server started on port ${server_port}`));
    }
    catch (error) {
        logger.error(error);
    }
};
start();
