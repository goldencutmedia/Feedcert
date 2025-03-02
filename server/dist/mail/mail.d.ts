export declare class Mail {
    transporter: any;
    constructor();
    send(data: {
        from: string;
        to: string;
        subject: string;
        text?: string;
        html?: string;
    }): Promise<any>;
}
