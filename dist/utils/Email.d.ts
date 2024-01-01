export declare class Email {
    private email;
    constructor(email: string);
    sendTestMail(url: string): Promise<void>;
    sendVerificationEmail(verificationUrl: string): Promise<void>;
    sendForgetPasswordEmail(resetUrl: string): Promise<void>;
    sendInvitationEmail(invitationLink: string, content: string): Promise<void>;
}
