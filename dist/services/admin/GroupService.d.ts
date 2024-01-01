declare class GroupService {
    /**
     *
     * @param groupId
     * @returns Promise<any>
     */
    groupDetails(groupId: string | string): Promise<any>;
    deleteGroups(groupIds: string[]): Promise<boolean>;
    groupMemberList(groupId: string, skip: number, limit: number, search: string): Promise<{
        count: number;
        list: any[];
    }>;
}
declare const _default: GroupService;
export default _default;
