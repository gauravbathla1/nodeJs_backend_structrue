declare class SendMailService {
    private transporter;
    constructor();
    sendEmail(to: string, subject: string, dynamicData: any): Promise<void>;
}
declare const _default: SendMailService;
export default _default;
