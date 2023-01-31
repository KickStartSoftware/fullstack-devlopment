"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    server_port: process.env.PORT || 5000,
    token_lifetime: process.env.JWT_LIFETIME,
    token_secret: process.env.JWT_SECRET,
    mongo_uri: process.env.MONGO_URI,
    email_client: process.env.EMAIL_CLIENT,
    frontend_origin: process.env.NODE_ENV === 'production'
        ? process.env.BASE_URL_PROD
        : process.env.BASE_URL_DEV,
    sendgrid_api_key: process.env.SEND_GRID_API_KEY,
};
