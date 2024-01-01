import { GroupInterface } from "../../interfaces/GroupInterface";
import { ObjectId } from 'mongoose';
import { UserInterface } from "../../interfaces/UserInterface";
declare class GroupService {
    /**
     *
     * @param photo
     * @returns uploaded photo url.
     */
    private UploadPhoto;
    /**
     *
     * @param name
     * @returns groupPurpose of interface GroupPurposeInterface.
     */
    private handleGroupPurpose;
    /**
     *
     * @param groupData group data to be saved.
     * @param purpose  purpose may be an ObjectId or string.
     * @param others whether purpose is ObjectId or not.
     * @param groupIcon file for group icon.
     * @returns data of type GroupInterface.
     */
    createGroup(userId: ObjectId, groupData: GroupInterface, purpose: string, others: boolean, groupIcon: any): Promise<GroupInterface>;
    /**
     *
     * @param userId
     * @param groupId
     * @returns data of type GroupMemberInterface;
     */
    private handleGroupMember;
    /**
     * @void
     * @returns code:string
     */
    private generateGroupId;
    /**
     *
     * @param groupId
     * @returns Promise<any>
     */
    groupDetails(groupId: string, userId: ObjectId | string): Promise<any>;
    /**
     *
     * @param groupId
     * @param groupData
     * @param groupIcon
     * @returns {Promise<GroupInterface>}
     */
    editGroup(groupId: string, groupData: GroupInterface, groupIcon?: any): Promise<GroupInterface>;
    /**
     *
     * @param groupId
     * @param skip
     * @param limit
     * @param search
     * @returns {Promise<any>} list of group members.
     */
    groupMemberList(groupId: string, skip: number, limit: number, search: string): Promise<{
        count: number;
        list: any[];
    }>;
    /**
     *
     * @param {string} groupId
     * @param {string} memberId
     * @returns {Promise}
     */
    removeMember(groupId: string, memberId: string, userId: ObjectId): Promise<{
        groupNotExist?: boolean;
        notGroupMember?: boolean;
        notAdmin?: boolean;
        group?: GroupInterface;
    }>;
    /**
     *
     * @param group
     * @param userId
     * @returns Promise<GroupInterface>
     */
    private handleUserRemove;
    /**
     *
     * @param groupId
     * @param memberId
     * @returns Promise<boolean>
     */
    private handleGroupMemberRemove;
    searchGroup(queryString: any, uId: string | ObjectId): Promise<{
        count: number;
        list: any;
    }>;
    /**
     *
     * @param userId
     * @param skip
     * @param limit
     * @param search
     * @returns {Promise<{count: number; list:any}>}
     */
    allGroupList(userId: ObjectId, skip: number, limit: number, search?: string): Promise<{
        count: number;
        list: any;
    }>;
    userLeftGroup(userId: ObjectId | string, groupId: string): Promise<{
        groupNotExist?: boolean;
        isAdmin?: boolean;
        notGroupMember?: boolean;
        group?: GroupInterface;
    }>;
    joinGroup(groupId: string, user: UserInterface): Promise<{
        groupNotExist?: boolean;
        alreadyMember?: boolean;
        group?: GroupInterface;
    }>;
    private handleGroupMemberJoin;
}
declare const _default: GroupService;
export default _default;
