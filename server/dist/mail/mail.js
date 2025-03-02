"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = void 0;
const nodemailer = require('nodemailer');
const transport = {
    "type": "smtp",
    "host": "smtp.goldencutmedia.de",
    "secure": false,
    "port": 587,
    "tls": {
        "rejectUnauthorized": false
    },
    "auth": {
        "user": "verwaltung@goldencutmedia.de",
        "pass": "NEXD9mF7"
    }
};
class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport(transport);
    }
    async send(data) {
        return await this.transporter.sendMail({
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        });
    }
}
exports.Mail = Mail;
//# sourceMappingURL=mail.js.map