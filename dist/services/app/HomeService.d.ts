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
declare class HomeServce {
    constructor();
    getDailyQuotes(): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/QutesInterface").quotesInterface> & import("../../interfaces/QutesInterface").quotesInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getTechniques(option: Options, search?: string): Promise<import("mongoose").AggregatePaginateResult<any>>;
    getSituations(option: Options, search?: string): Promise<import("mongoose").AggregatePaginateResult<any>>;
    getCategories(option: Options): Promise<import("mongoose").AggregatePaginateResult<any>>;
    dashBoard(): Promise<{
        quotes: import("mongoose").Document<unknown, {}, import("../../interfaces/QutesInterface").quotesInterface> & import("../../interfaces/QutesInterface").quotesInterface & {
            _id: import("mongoose").Types.ObjectId;
        };
        techniques: any[];
        deepDive: any[];
        situations: any[];
    }>;
    static getQuotes(): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/QutesInterface").quotesInterface> & import("../../interfaces/QutesInterface").quotesInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    static getDeepDives(): Promise<any[]>;
    static getSituation(): Promise<any[]>;
    static getTechnique(): Promise<any[]>;
    getDetails(id: string, type: string, userId: string, title: string): Promise<any>;
    static maangeViewRecord(id: any, type: any, userId: any): Promise<void>;
    share(shareType: string, shareId: string): Promise<any>;
}
declare const UserHomeServce: HomeServce;
export interface Options {
    page?: number;
    limit: number;
    sort: {
        createdAt: number;
    };
}
export default UserHomeServce;
