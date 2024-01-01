/// <reference types="mongoose-aggregate-paginate-v2" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { ObjectId } from "aws-sdk/clients/codecommit";
import { UserInterface } from "../../interfaces/UserInterface";
declare class UserService {
    /**
   * @description listing of user
   * @param queryString req query object
   * @params User id of user
   * @returns
   */
    getDashBoardData(): Promise<{
        totaUsers: number;
        activeUsers: number;
        views: any[];
        searches: any[];
    }>;
    static getTopViews(): Promise<any[]>;
    getUserList(options: any): Promise<import("mongoose").AggregatePaginateResult<any>>;
    updateUserStatus(id: any): Promise<import("mongoose").Document<unknown, {}, UserInterface> & UserInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    /**
  * @description get user by id
  * @param id {String} user id for fetching user
  * @returns {Promise<UserInterface>} user data by id
  */
    findUser(id: string | ObjectId): Promise<UserInterface>;
}
declare const _default: UserService;
export default _default;
