import { CategoryInterface } from "../../interfaces/CategoryInterface";
import { ProductInterface } from "../../interfaces/ProductInterface";
import { SectionInterface } from "../../interfaces/SectionInterface";
import { SubCategoryInterface } from "../../interfaces/SubcategoryInterface";
declare class SearchService {
    /**
     *
     * @param category
     * @returns true
     */
    addCategoryDocument(category: CategoryInterface): Promise<boolean>;
    /**
     *
     * @param category category document
     * @param isActive boolean
     * @returns true
     */
    updateCategoryDocument(category: CategoryInterface, isActive?: boolean): Promise<boolean>;
    /**
     *
     * @param subcategory subcategory document
     * @returns true
     */
    addSubcategoryDocument(subcategory: SubCategoryInterface): Promise<boolean>;
    /**
     *
     * @param subcategory document
     * @param isActive boolean
     * @returns true
     */
    updateSubcategoryDocument(subcategory: SubCategoryInterface, isActive?: boolean): Promise<boolean>;
    /**
     *
     * @param section section document
     * @returns true
     */
    addSectionDocument(section: SectionInterface): Promise<boolean>;
    /**
     *
     * @param section document
     * @param isActive boolean
     * @returns true
     */
    updateSectionDocument(section: SectionInterface, isActive?: boolean): Promise<boolean>;
    /**
     *
     * @param product Product Document
     * @returns true
     */
    addProductDocument(product: ProductInterface): Promise<boolean>;
    /**
     *
     * @param product Product Document
     * @param isActive boolean
     * @returns true
     */
    updateProductDocument(product: ProductInterface, isActive?: boolean): Promise<boolean>;
}
declare const _default: SearchService;
export default _default;
