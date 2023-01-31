"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = require("../../config");
class EmailService {
    constructor() {
        this.sendGridClient = mail_1.default;
        this.emailClient = config_1.config.email_client;
        this.apiKey = config_1.config.sendgrid_api_key;
        this.origin = config_1.config.frontend_origin;
    }
    triggerMailAction() {
        this.sendGridClient.setApiKey(this.apiKey);
    }
    constructBaseUrl(url, token, email) {
        return `${this.origin}${url}?token=${token}&email=${email}`;
    }
    async sendEmail(createEmailDto) {
        return this.sendGridClient.send({
            to: createEmailDto.email,
            from: this.emailClient,
            subject: createEmailDto.subject,
            text: createEmailDto.text,
            html: createEmailDto.html,
        });
    }
    async sendPasswordResetEmail(verificationEmailDto) {
        this.triggerMailAction();
        const baseUrl = this.constructBaseUrl('/auth/reset-password', verificationEmailDto.token, verificationEmailDto.email);
        const html = `<h3>hello from Desktop App!</h3>
        <p>Reset your password</p>
        <p>
         Click this link to <br />
            <a href="${baseUrl}">reset your password</a>
        </p>
        `;
        const createEmailDto = {
            email: verificationEmailDto.email,
            subject: 'Password Reset',
            text: 'Testing mail',
            html,
        };
        return this.sendEmail(createEmailDto);
    }
}
exports.EmailService = EmailService;
