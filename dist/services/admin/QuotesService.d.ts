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
declare class QuotesService {
    createQuote(Quotes: string): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/QutesInterface").quotesInterface> & import("../../interfaces/QutesInterface").quotesInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editQuote(quoteId: string, quotes: string): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/QutesInterface").quotesInterface> & import("../../interfaces/QutesInterface").quotesInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteQuotes(quoteId: string): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/QutesInterface").quotesInterface> & import("../../interfaces/QutesInterface").quotesInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getQuotes(options: any): Promise<import("mongoose").AggregatePaginateResult<any>>;
    updateQuotesPosition(): Promise<void>;
}
declare const quotesAdminService: QuotesService;
export default quotesAdminService;
