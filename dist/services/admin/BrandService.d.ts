import { BrandInterface } from "../../interfaces/BrandInterface";
import { ObjectId } from 'mongoose';
declare class BrandService {
    /**
     *
     * @param name
     * @param logoImage
     * @param categories
     * @returns new added brand
     */
    addBrand(name: string, logoImage: any, categories: string[] | ObjectId[]): Promise<{
        brand: BrandInterface;
    } | void>;
    /**
     *
     * @param file any file
     * @returns upload file base path on s3
     */
    private uploadBrandImage;
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString: any): Promise<{
        count: number;
        list: BrandInterface[];
    }>;
    edit(id: string, logoImage: any, name: string, categories: string[] | ObjectId[]): Promise<BrandInterface>;
}
declare const _default: BrandService;
export default _default;
