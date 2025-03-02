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

export class Mail {

    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport(
            transport
        );
    }

    async send(data: {
        from: string,
        to: string,
        subject: string,
        text?: string,
        html?: string
    }) {
        return await this.transporter.sendMail({
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        });
    }
}