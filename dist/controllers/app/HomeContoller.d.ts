import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class UserAuthController {
    /**
   * @api {get}  api/v1/app/home/ Home-page
   * @apiVersion 0.3.0
   * @apiSampleRequest off
   * @apiName Home-page
   * @apiGroup Home
   *@apiSuccessExample {json}
      {"status":200,"statusText":"SUCCESS","message":"Dashboard list find successfully","quote":"As an HSP, your brain processes more information than the average. It's totally normal to recharge more as well. Take your\ntime and do your things in your own pace.","data":[{"title":"Recommended","situations_items":[{"_id":"65368e640eebfaba9ce828de","name":"new situation1"},{"_id":"6536790ca134c12aac0f48db","name":"new situation "},{"_id":"653675a9a134c12aac0f489b","name":"Going to market"}],"techniques_items":[]},{"title":"Dive Deeper","items":[{"_id":"65361f3304326f8da34254b2","name":"new category...."},{"_id":"65361c7804326f8da342547f","name":"happy"},{"_id":"653619c804326f8da342542e","name":"soft"},{"_id":"6536100f27bdf8e16ad0a232","name":"Artist"},{"_id":"653117db9f500bfb1f712523","name":"work"},{"_id":"653117c29f500bfb1f71251e","name":"Nutration"}]}]}
   */
    dashboard(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<ResInterface>;
    getQuote(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    getCommonTechniqueOrSitutation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getTechniques(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getSituation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    getCategories(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    getDetails(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    share(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<ResInterface>;
}
declare const _default: UserAuthController;
export default _default;
