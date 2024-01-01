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
declare class CategoryService {
    createCategory(categoryName: string): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/CategoryInterface").categoryInterface> & import("../../interfaces/CategoryInterface").categoryInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCategory(options: any): Promise<import("mongoose").AggregatePaginateResult<any>>;
    getAllCategories(): Promise<(import("mongoose").Document<unknown, {}, import("../../interfaces/CategoryInterface").categoryInterface> & import("../../interfaces/CategoryInterface").categoryInterface & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    editCategory(categoryId: string, categoryName: string): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/CategoryInterface").categoryInterface> & import("../../interfaces/CategoryInterface").categoryInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteCategory(categoryId: string): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces/CategoryInterface").categoryInterface> & import("../../interfaces/CategoryInterface").categoryInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
declare const categoryAdminService: CategoryService;
export default categoryAdminService;
