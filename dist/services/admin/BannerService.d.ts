import { BannerInterface } from "../../interfaces/BannerInterface";
declare class BannerService {
    /**
     *
     * @param photo {string} photo of banner
     * @param clickUrl {string} absolute path of banner clickUrl
     * @returns banner {Promise<BannerInterface>} new added banner
     */
    add(photo: any, clickUrl: string, deviceType: string): Promise<BannerInterface>;
    /**
     *
     * @param photo {File} photo to be uploaded
     * @param directory {String} photo directory
     * @returns {Promise<{url: string}>} uploaded photo base path
     */
    private uploadPhoto;
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString: any): Promise<{
        count: number;
        list: BannerInterface[];
    }>;
    /**
       *
       * @param id {String} banner id for edit banner
       * @param directory {String} photo directory
       * @returns {Promise<ProductInterface>} edit banner
       */
    edit(id: string, photo: any, clickUrl: string, deviceType: string): Promise<BannerInterface>;
}
declare const _default: BannerService;
export default _default;
