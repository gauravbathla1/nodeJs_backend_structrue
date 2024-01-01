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
declare class SituationService {
    createSituation(payload: any): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/SituationInterface").SituationInterface> & import("../../interfaces/SituationInterface").SituationInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editSituation(situationId: string, payload: any): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/SituationInterface").SituationInterface> & import("../../interfaces/SituationInterface").SituationInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteSituation(situationId: string): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/SituationInterface").SituationInterface> & import("../../interfaces/SituationInterface").SituationInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getSituations(options: any): Promise<import("mongoose").AggregatePaginateResult<any>>;
    uploadImage(files: any): Promise<string>;
}
declare const situationAdminService: SituationService;
export default situationAdminService;
