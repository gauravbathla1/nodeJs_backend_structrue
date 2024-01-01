import { ObjectId } from 'mongoose';
import { GroupInterface } from '../../interfaces/GroupInterface';
import { UserInterface } from '../../interfaces/UserInterface';
import { GroupMemberInterface } from '../../interfaces/GroupMemberInterface';
declare class GroupRequestService {
    /**
     *
     * @param userId requested user id
     * @param sendBy request sender id
     * @param groupId groupId
     * @param groupCode unique group code
     * @returns GroupRequest, isRequestExists, isMemberExists
     */
    createRequest(userId: string | ObjectId, groupId: string | ObjectId, groupCode: string, requestSentBy: ObjectId): Promise<{
        groupRequest?: GroupMemberInterface;
        isMemberExist?: boolean;
        isRequestExist?: boolean;
    }>;
    /**
     *
     * @param group group object
     * @param user user object
     * @param isAccept true or false
     * @returns {Promise<requestNotExists?: boolean,isRequestAccepted?: boolean,isRequestRejected?: boolean>}
     */
    groupRequest(group: GroupInterface, user: UserInterface, isAccept: boolean): Promise<{
        requestNotExists?: boolean;
        isRequestAccepted?: boolean;
        isRequestRejected?: boolean;
    }>;
    /**
     *
     * @param request group request object
     * @param group group object
     * @param user user object
     * @returns {Promise<true>}
     */
    handleRequestAccept(request: GroupMemberInterface, group: GroupInterface, user: UserInterface, isNotRequest?: boolean): Promise<boolean>;
    /**
     *
     * @param request group request object
     * @returns {Promise<true>}
     */
    private handleRequestReject;
    groupRequestList(currentUserId: string | ObjectId, queryString: any): Promise<{
        count: number;
        list: any;
    }>;
}
declare const _default: GroupRequestService;
export default _default;
