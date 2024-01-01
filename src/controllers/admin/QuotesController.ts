import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import QuoteService from "../../services/admin/QuotesService";

class QuotesController {
  async createQuote(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let { quote } = req.body;
      await QuoteService.createQuote(quote);
      return ResponseHelper.created(res, "Quote Added successfully", {});
    } catch (error) {
      next(error);
    }
  }

  async editQuote(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let quoteId = req.params?.id;
      let { quote } = req.body;
      await QuoteService.editQuote(quoteId, quote);
      return ResponseHelper.ok(res, "Quote Updated successfully", {});
    } catch (error) {
      next(error);
    }
  }

  async deleteQuote(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      let quoteId = req.params?.id;
      const quote = await QuoteService.deleteQuotes(quoteId);
      return ResponseHelper.ok(res, "quote Deleted successfully", { quote });
    } catch (error) {
      next(error);
    }
  }

  async getQuotes(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let page = req.query.page || 1;
      let options = {
        page: page || 1,
        limit: 10,
        sort: {
          created_at: -1,
        },
      };
      let quotes = await QuoteService.getQuotes(options);
      return ResponseHelper.ok(res, "Quotes find successfully", { quotes });
    } catch (error) {
      next;
    }
  }
}
export default new QuotesController();
