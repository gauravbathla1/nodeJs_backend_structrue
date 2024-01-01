import { UserInterface } from "../../interfaces/UserInterface";
import { GroupInterface } from "../../interfaces/GroupInterface";
declare class GroupInviteService {
    inviteMember(sender: UserInterface, groupId: string, emails: string[], content: string): Promise<{
        groupNotExists?: boolean;
        notAdmin?: boolean;
        isInvited?: boolean;
    }>;
    /**
     *
     * @param groupId
     * @param emails
     * @param content
     */
    sendInvitationEmails(group: GroupInterface, sender: UserInterface, emails: string[], content: string): Promise<void>;
    /**
     *
     * @param endPoint
     * @param token
     * @returns
     */
    getDeepLink(endPoint: string, token: string): Promise<string>;
}
declare const _default: GroupInviteService;
export default _default;
