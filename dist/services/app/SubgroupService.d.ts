import { SubgroupInterface } from "../../interfaces/SubgroupInterface";
import { ObjectId, PipelineStage } from 'mongoose';
import { UserInterface } from "../../interfaces/UserInterface";
declare class SubgroupService {
    createGroup(subgroupData: SubgroupInterface, icon: any, user: UserInterface): Promise<{
        groupNotFound?: boolean;
        notAdmin?: boolean;
        subgroup?: SubgroupInterface;
    }>;
    private uploadIcon;
    private createSubgroupMember;
    private handleGroup;
    subgroupDetails(subgroupId: string, user: UserInterface): Promise<{
        subgroupNotFound?: boolean;
        subgroup?: any;
    }>;
    listAggPipeline(condition: {
        [key: string]: any;
    }, userId: ObjectId, queryString: any): PipelineStage[];
    handleSubgroupMemberRemove(subgroupId: string | ObjectId, userId: string | ObjectId): Promise<boolean>;
    addMember(subgroupId: string | ObjectId, memberId: string | ObjectId): Promise<{
        subgroupNotFound?: boolean;
        alreadyMember?: boolean;
        notGroupMember?: boolean;
        limitExceed?: boolean;
        subgroup?: SubgroupInterface;
    }>;
    private checkSubgroupMember;
    private checkGroupMember;
    groupMemberListToAddSubgroup(subgroupId: string, queryString: any, user: UserInterface): Promise<{
        subgroupNotExists?: boolean;
        result?: {
            list?: any[];
            count: number;
        };
    }>;
    removeMember(memberId: string | ObjectId, subgroupId: string | ObjectId, user: UserInterface): Promise<{
        memberNotExists?: boolean;
        isRemoved?: boolean;
        notAdmin?: boolean;
    }>;
    deleteSubgroup(subgroupId: string | ObjectId, user: UserInterface): Promise<{
        subgroupNotExists?: boolean;
        notAdmin?: boolean;
        isDeleted?: boolean;
    }>;
    editSubgroup(subgroupId: ObjectId | string, subgroupData: SubgroupInterface, userData: UserInterface, icon?: any): Promise<{
        subgroupNotFound?: boolean;
        notAdmin?: boolean;
        subgroup?: SubgroupInterface;
    }>;
}
declare const _default: SubgroupService;
export default _default;
