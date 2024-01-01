import { ProductInterface } from "../../interfaces/ProductInterface";
declare class ProductService {
    add(productData: any): Promise<ProductInterface>;
    /**
     *
     * @returns {Promise<string>} unique product sku
     */
    generateSku(): Promise<string>;
    /**
     *
     * @param productData
     * @returns updated productData with category subcategory and section name
     */
    getCategoryBrandData(productData: any): Promise<any>;
    /**
     *
     * @returns {String} a 10 digits code
     */
    getCode(): string;
    /**
     *
     * @param productId product id of
     * @param photos
     * @param coverPhoto
     * @returns
     */
    uploadImage(productId: string, photos: any, coverPhoto: File, product: ProductInterface): Promise<ProductInterface>;
    /**
     *
     * @param photos
     * @param productId
     * @returns
     */
    private uploadPhotos;
    /**
     * @description upload a photo on s3
     * @param photo
     * @param productId
     * @returns
     */
    private uploadPhoto;
    /**
     * @description upload cover photo
     * @param coverPhoto
     * @param productId
     * @returns
     */
    private uploadCoverPhoto;
    /**
        *
        * @param file
        * @param directory
        * @returns
        * @description Upload cover photo different sizes on s3
        */
    private uploadImageCopy;
    /**
       *
       * @param coverPhoto
       * @param productId
       * @returns
       * @description change cover photo different sizes on s3
       */
    changeCoverPhoto(coverPhoto: any, productId: string): Promise<ProductInterface>;
    private getFileExtension;
    /**
      * @param queryString
      * @returns
      */
    list(queryString: any): Promise<{
        count: number;
        list: ProductInterface[];
    }>;
    /**
        *
        * @param id {String} product id for edit product
        * @returns {Promise<ProductInterface>} edit product
        */
    edit(productData: any, id: string): Promise<ProductInterface>;
    /**
        *
        * @param id {String} product id for deleting product
        * @returns {Promise<ProductInterface>} deleted product
        */
    delete(id: string): Promise<ProductInterface>;
    /**
       *
       * @param id {String} product id for delete productId
       * @param id {String} coverPhotoUrl for deleted coverphotoUrl
       * @returns {Promise<ProductInterface>} deleteCoverImage
       */
    deleteCoverImage(id: string, coverPhotoUrl: string): Promise<ProductInterface>;
    deletePhoto(id: string, photoUrl: string): Promise<ProductInterface>;
    fetchProduct(productId: string): Promise<{
        product: ProductInterface;
    }>;
}
declare const _default: ProductService;
export default _default;
