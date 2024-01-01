"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const HomeService_1 = require("../../services/app/HomeService");
class UserAuthController {
    /**
   * @api {get}  api/v1/app/home/ Home-page
   * @apiVersion 0.3.0
   * @apiSampleRequest off
   * @apiName Home-page
   * @apiGroup Home
   *@apiSuccessExample {json}
      {"status":200,"statusText":"SUCCESS","message":"Dashboard list find successfully","quote":"As an HSP, your brain processes more information than the average. It's totally normal to recharge more as well. Take your\ntime and do your things in your own pace.","data":[{"title":"Recommended","situations_items":[{"_id":"65368e640eebfaba9ce828de","name":"new situation1"},{"_id":"6536790ca134c12aac0f48db","name":"new situation "},{"_id":"653675a9a134c12aac0f489b","name":"Going to market"}],"techniques_items":[]},{"title":"Dive Deeper","items":[{"_id":"65361f3304326f8da34254b2","name":"new category...."},{"_id":"65361c7804326f8da342547f","name":"happy"},{"_id":"653619c804326f8da342542e","name":"soft"},{"_id":"6536100f27bdf8e16ad0a232","name":"Artist"},{"_id":"653117db9f500bfb1f712523","name":"work"},{"_id":"653117c29f500bfb1f71251e","name":"Nutration"}]}]}
   */
    dashboard(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dashBoardData = yield HomeService_1.default.dashBoard();
                let data = [
                    {
                        title: "Recommended",
                        situations_items: dashBoardData === null || dashBoardData === void 0 ? void 0 : dashBoardData.situations,
                        techniques_items: dashBoardData === null || dashBoardData === void 0 ? void 0 : dashBoardData.techniques,
                    },
                    {
                        title: "Dive Deeper",
                        items: dashBoardData === null || dashBoardData === void 0 ? void 0 : dashBoardData.deepDive,
                    },
                ];
                return res.status(200).json({
                    status: 200,
                    statusText: "SUCCESS",
                    message: "Dashboard list find successfully",
                    quote: ((_a = dashBoardData === null || dashBoardData === void 0 ? void 0 : dashBoardData.quotes) === null || _a === void 0 ? void 0 : _a.quote)
                        ? (_b = dashBoardData === null || dashBoardData === void 0 ? void 0 : dashBoardData.quotes) === null || _b === void 0 ? void 0 : _b.quote
                        : null,
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getQuote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield HomeService_1.default.getDailyQuotes();
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("quote find successfully"), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
       * @api {post}api/v1/app/home/common/technique-situation Common Technique/situation
       * @apiVersion 0.3.0
       * @apiSampleRequest off
       * @apiName Common Technique/
       * @apiGroup Home
       * @apiParamExample {json} Request-Example:
       * {"page":1,"limit":10,list_type:"Techniques/Situations","search_text":"seachValue"}
       *@apiSuccessExample {json}
    {"status":200,"statusText":"SUCCESS","message":"Techniques & Situations list find successfully","data":{"docs":[{"_id":"6536790ca134c12aac0f48db","title":"new situation 1","image_url":"images/1698068699139"}],"totalDocs":1,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null,"execTime":638}}
      */
    getCommonTechniqueOrSitutation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit, list_type, search_text } = req === null || req === void 0 ? void 0 : req.body;
                const options = {
                    page: page || 1,
                    limit: limit || 10,
                    sort: {
                        createdAt: -1,
                    },
                };
                let data = [];
                if ((list_type === null || list_type === void 0 ? void 0 : list_type.toLowerCase()) == 'techniques') {
                    data = yield HomeService_1.default.getTechniques(options, search_text);
                }
                else if ((list_type === null || list_type === void 0 ? void 0 : list_type.toLowerCase()) == 'situations') {
                    data = yield HomeService_1.default.getSituations(options, search_text);
                }
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("Techniques & Situations list find successfully"), data);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    getTechniques(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit } = req === null || req === void 0 ? void 0 : req.query;
                const options = {
                    page: page || 1,
                    limit: limit || 10,
                    sort: {
                        createdAt: -1,
                    },
                };
                const data = yield HomeService_1.default.getTechniques(options);
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("technique list find successfully"), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSituation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit } = req === null || req === void 0 ? void 0 : req.query;
                const options = {
                    page: page || 1,
                    limit: limit || 10,
                    sort: {
                        createdAt: -1,
                    },
                };
                const data = yield HomeService_1.default.getSituations(options);
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("Situation list find successfully"), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
       * @api {get} api/v1/app/home/categories Categories List
       * @apiVersion 0.3.0
       * @apiSampleRequest off
       * @apiName Categories
       * @apiGroup Home
       * @apiDescription for pagination page and limit key send in query params ?page=1&limit=10
       *@apiSuccessExample {json}
      {"status":200,"statusText":"SUCCESS","message":"Categories list find successfully","data":{"docs":[{"_id":"653117c29f500bfb1f71251e","name":"Nutration"},{"_id":"653117db9f500bfb1f712523","name":"work"},{"_id":"6536100f27bdf8e16ad0a232","name":"Artist"},{"_id":"653619c804326f8da342542e","name":"soft"},{"_id":"65361c7804326f8da342547f","name":"happy"},{"_id":"65361f3304326f8da34254b2","name":"new category...."}],"totalDocs":6,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null,"execTime":1045}}
      */
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit } = req === null || req === void 0 ? void 0 : req.query;
                const options = {
                    page: page || 1,
                    limit: limit || 10,
                    sort: {
                        createdAt: -1,
                    },
                };
                const data = yield HomeService_1.default.getCategories(options);
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("Categories list find successfully"), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    /**
      * @api {get} api/v1/app/home/detail?type=techniques&id=653bce0b37b270ca69fdff59 Detail for techniques/situation
      * @apiVersion 1.0.0
      * @apiGroup Home
      * @apiDescription for pagination page and limit key send in query params ?type=techniques/situations&id=653117c29f500bfb1f71251e
      *@apiSuccessExample Response For Technique
     {"status":200,"statusText":"SUCCESS","message":"Detail find successfully","data":{"instructionContent":{"content":"instructions content","animation":"https://hsp-bucket.s3.amazonaws.com/images/1698416488068"},"whyItWorksContent":{"content":"why it work content","animation":"https://hsp-bucket.s3.amazonaws.com/images/1698416506450"},"_id":"653bce0b37b270ca69fdff59","categoryName":"name","name":"new technique2","image":"https://hsp-bucket.s3.amazonaws.com/images/1698416477730"}}
      *@apiSuccessExample Response For Situation
     *{"status":200,"statusText":"SUCCESS","message":"Detail find successfully","data":{"peaceContent":{"content":"<p>zsssssssssssssssssssslslslslslsl</p>","animation":"https://hsp-bucket.s3.amazonaws.com/images/1698068714989"},"flowContent":{"content":"<p>hfhfgfgsxsxsxsxsxsxs</p>","animation":"https://hsp-bucket.s3.amazonaws.com/images/1698068722147"},"_id":"6536790ca134c12aac0f48db","categoryName":"name","name":"new situation 1","image":"https://hsp-bucket.s3.amazonaws.com/images/1698068699139"}}
     */
    getDetails(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { type, id, title } = req === null || req === void 0 ? void 0 : req.query;
                let userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
                let data = yield HomeService_1.default.getDetails(id, type, userId, title);
                console.log(data, "details");
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("Detail find successfully"), data);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    ;
    share(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { shareType, shareId } = req.body;
                const data = yield HomeService_1.default.share(shareType, shareId);
                // let data = await HomeService.getDetails(id,type,userId);
                if (data)
                    // return ResponseHelper.ok(
                    //   res,
                    //   res.__("Detail find successfully"),
                    //   data
                    // );
                    return res.json({ data });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserAuthController();
