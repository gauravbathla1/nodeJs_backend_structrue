import { ObjectId } from "mongoose";
export interface TaxCategoryInterface {
    _id?: ObjectId;
    name: string;
    product_tax_code: string;
    description: string;
}
