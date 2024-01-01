import { ObjectId } from 'mongoose';
import { FilterInterface } from '../../interfaces/FilterInterface';
declare class FilterService {
    /**
     * @description create filter
     * @param categoryId
     * @returns
     */
    createFilter(categoryId: string | ObjectId): Promise<void>;
    /**
     *
     * @param categoryId
     * @param data {
            colors?: string[],
            brand?: { _id: string | ObjectId, name: string },
            subcategory?: { _id: string | ObjectId, name: string },
            price?: number,
            attributeList?: { name: string, values: string[] }[]
        }
     * @returns void
     */
    updateFilter(categoryId: string | ObjectId, data: {
        colors?: string[];
        brand?: {
            _id: string | ObjectId;
            name: string;
            slug: string;
        };
        subcategory?: {
            _id: string | ObjectId;
            name: string;
            slug: string;
        };
        price?: number;
        rating?: number;
        attributeList?: {
            name: string;
            values: string[];
        }[];
    }): Promise<void>;
    /**
     *
     * @param filter
     * @param colors
     * @returns updated filter
     */
    private updateColors;
    private updateRatings;
    /**
     *
     * @param filter
     * @param brand
     * @returns updated filter
     */
    private updateBrands;
    /**
     *
     * @param filter
     * @param subcategory
     * @returns updated filter
     */
    private updateSubcategories;
    /**
     *
     * @param filter
     * @param price
     * @returns updated filter
     */
    private updatePrice;
    /**
     * @param filter
     * @param list
     * @returns updated filter
     */
    private updateAttributes;
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString: any): Promise<{
        count: number;
        list: FilterInterface[];
    }>;
}
declare const _default: FilterService;
export default _default;
