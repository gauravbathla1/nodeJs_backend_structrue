import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ProductReportController {
    /**
     * @api {get} /api/v1/admin/product-reports  Get Product Reports
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName list-product-Report
     * @apiGroup Admin-ProductReport
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *   "status": 200,
     *   "statusText": "SUCCESS",
     *   "message": "Product Report fetch successfully",
     *   "data": [
     *         {
     *        "reports": [
     *            {
     *                "_id": "62f0ec78def05cf024e98d7c",
     *                "reasonText": "shoes size does not match pls actual size provided and pls exchange my shoes",
     *                "createdAt": "2022-08-08T10:59:04.835Z",
     *                "product": {
     *                    "_id": "62d7c92286616ebe475db3fa",
     *                    "name": "Samasung",
     *                    "salePrice": 3000
     *                },
     *                "reporter": {
     *                    "_id": "62dfcb21fb89c4b45de44685",
     *                    "name": "puhraj saini"
     *                }
     *            },
     *            {
     *                "_id": "62f0c032dc5b8cf8ea66c808",
     *                "reasonText": "my dress are defected pls exchange my dress",
     *                "createdAt": "2022-08-08T07:50:10.639Z",
     *                "product": {
     *                    "_id": "62d6aec0504d41e6c4a5d50f",
     *                    "name": "Tesla Car",
     *                    "_id": "62d7cccc86616ebe475db688",
     *                    "name": "samsung",
     *                    "salePrice": 2000,
     *                    "coverPhoto": "product/62d7cccc86616ebe475db688/cover-photo/default.jpeg"
     *                },
     *                "reporter": {
     *                    "_id": "62dfcb21fb89c4b45de44685",
     *                    "name": "puhraj saini"
     *                }
     *            },
     *            {
     *                "_id": "62f0bf4424efcc4ad8b7c867",
     *                "reasonText": "my dress are defected pls exchange my dress",
     *                "createdAt": "2022-08-08T07:46:12.746Z",
     *                "product": {
     *                    "_id": "62d687fff055ab9d06da8925",
     *                    "name": "testedd",
     *                    "salePrice": 3000
     *                },
     *                "reporter": {
     *                    "_id": "62dfcb21fb89c4b45de44685",
     *                    "name": "puhraj saini"
     *                }
     *            },
     *            {
     *                "_id": "62f0b6d23b1ac3fe288960dd",
     *                "reasonText": "my dress are defected pls exchange my dress",
     *                "createdAt": "2022-08-08T07:10:10.464Z",
     *                "product": {
     *                    "_id": "62d687fff055ab9d06da8925",
     *                    "name": "testedd",
     *                    "salePrice": 3000
     *                },
     *                "reporter": {
     *                    "_id": "62dfcb21fb89c4b45de44685",
     *                    "name": "puhraj saini"
     *                }
     *            },
     *            {
     *                "_id": "62f0b5cf4957029d836c0f82",
     *                "reasonText": "my dress are defected pls exchange my dress",
     *                "createdAt": "2022-08-08T07:05:51.867Z",
     *                "product": {
     *                    "_id": "62d687fff055ab9d06da8925",
     *                    "name": "testedd",
     *                    "salePrice": 3000
     *                },
     *                "reporter": {
     *                    "_id": "62dfcb21fb89c4b45de44685",
     *                    "name": "puhraj saini"
     *                }
     *            },
     *            {
     *                "_id": "62ed07e6cb37425f25558172",
     *                "reasonText": "mobile display is damaged pls exchange my mobile",
     *                "createdAt": "2022-08-05T12:07:02.484Z",
     *                "product": {
     *                    "_id": "62cfb67426bd109f9ae2d7cf",
     *                    "name": "Mobile",
     *                    "salePrice": 45000,
     *                    "coverPhoto": "product/62cfb67426bd109f9ae2d7cf/cover-photo/default.png"
     *                },
     *                "reporter": {
     *                    "_id": "62dfcb21fb89c4b45de44685",
     *                    "name": "puhraj saini"
     *                }
     *            }
     *        ],
     *        "count": 7
     *               }
     *             ]
     *            }
     */
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ProductReportController;
export default _default;
