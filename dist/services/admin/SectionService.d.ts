import { ResInterface } from "../../interfaces/ReqInterface";
import { SectionInterface } from "../../interfaces/SectionInterface";
declare class SectionService {
    /**
     *
     * @param category category id
     * @param subcategory subcategory id
     * @param name section name
     * @param res {Promise<SectionInterface>}
     */
    add(category: string, subcategory: string, name: string, image: any, res: ResInterface): Promise<SectionInterface | void>;
    /**
     *
     * @param file any file
     * @returns upload file base path on s3
     */
    private uploadSectionImage;
    /**
    *
    * @param id {String} section id for fetching section
    * @returns {Promise<SectionInterface>} section data by id
    */
    getSectionData(id: string): Promise<SectionInterface>;
    /**
     *
     * @param sectionId {String} section id for updating section
     * @param category {String} category id
     * @param subcategory {String} subcategory id
     * @param name {String} name of section
     * @param res response Object
     * @returns {Promise<SectionInterface>} update section object
     */
    update(sectionId: string, category: string, subcategory: string, name: string, image: any, res: ResInterface): Promise<SectionInterface | void>;
    /**
     *
     * @param id {String} section id for deleting section
     * @returns {Promise<SectionInterface>} deleted section
     */
    delete(id: string): Promise<SectionInterface>;
    /**
    *
    * @param queryString req query object
    * @params subcategory id of subcategory
    * @returns
    */
    list(queryString: any, subcategory: string): Promise<{
        count: number;
        list: SectionInterface[];
    }>;
}
declare const _default: SectionService;
export default _default;
