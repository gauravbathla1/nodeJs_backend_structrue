import { ReviewInterface } from "../../interfaces/ReviewInterface";
declare class ReviewService {
    /**
    *
    * @param productId
    * @param userId
    * @param rating
    * @param description
    * @returns new added review
    */
    add(productId: string, userId: any, rating: number, description: string): Promise<ReviewInterface>;
    /** @param id {String} review id for updating review
   * @param rating rating of review
   * @param description description of review
   * @returns {Promise<ReviewInterface>} updated review
   */
    edit(_id: string, rating: number, description: string): Promise<ReviewInterface>;
}
declare const _default: ReviewService;
export default _default;
