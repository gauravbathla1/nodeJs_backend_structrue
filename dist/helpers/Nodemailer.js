"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
const htmlHelper_1 = require("../helpers/htmlHelper");
class SendMailService {
    constructor() {
        // Configure AWS SES with your credentials
        AWS.config.update({
            region: 'ap-south-1',
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
        });
        this.transporter = nodemailer.createTransport({
            SES: new AWS.SES({ apiVersion: '2010-12-01' }),
        });
    }
    sendEmail(to, subject, dynamicData) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: 'no-reply@peaceflow.app',
                to,
                subject,
                html: htmlHelper_1.default.HTMLMailFormat(dynamicData.name, dynamicData === null || dynamicData === void 0 ? void 0 : dynamicData.link, dynamicData.type),
            };
            try {
                const info = yield this.transporter.sendMail(mailOptions);
                console.log('Email sent: Message ID', info.messageId);
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        });
    }
}
exports.default = new SendMailService();
