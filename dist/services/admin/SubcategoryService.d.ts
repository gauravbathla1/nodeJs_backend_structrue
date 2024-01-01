import { SubCategoryInterface } from "../../interfaces/SubcategoryInterface";
declare class SubcategoryService {
    /**
     *
     * @param name {string} name of subcategory
     * @param category {string} object_id of category
     * @param image {string} absolute path of category image
     * @returns category {Promise<SubCategoryInterface>} new added category
     */
    add(name: string, category: string, categorySlug: string, slug: string, image: string): Promise<SubCategoryInterface>;
    /**
     *
     * @param _id id of subcategory
     * @param name name of subcategory
     * @param category related category id
     * @param image image absolute path (url)
     * @returns  {Promise<SubcategoryInterface>}
     */
    update(_id: string, name: string, category: string, image: string, slug: string, categorySlug: string): Promise<SubCategoryInterface>;
    /**
     *
     * @param id {String} subcategory id
     * @returns {Promise<SubcategoryInterface>} subcategory data
     */
    get(id: string): Promise<SubCategoryInterface>;
    /**
    *
    * @param id {String} subcategory id
    * @returns {Promise<SubcategoryInterface>} subcategory data
    */
    delete(_id: string, isDeleted: boolean): Promise<SubCategoryInterface>;
    /**
    *
    * @param queryString req query object
    * @params subcategory id of subcategory
    * @returns
    */
    list(queryString: any, category: string): Promise<{
        count: number;
        list: SubCategoryInterface[];
    }>;
}
declare const _default: SubcategoryService;
export default _default;
