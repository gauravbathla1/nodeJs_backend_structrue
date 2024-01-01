import QuotesModel from "../../models/QuoteModel";

class QuotesService{

  async createQuote(Quotes: string){
    let quote = new QuotesModel({
        quote: Quotes
    });
    await quote.save();
    return quote;
  }

  async editQuote(quoteId:string,quotes: string){
    let quote = QuotesModel.findByIdAndUpdate({_id:quoteId},{quote:quotes},{new:true});
    return quote;
  }

  async deleteQuotes(quoteId:string){
    let quote = QuotesModel.findByIdAndUpdate({_id:quoteId},{isDeleted:true},{new:true});
    return quote;
  }

  async getQuotes(options:any){
    let myAggregate = QuotesModel.aggregate([{
        $match:{
            isDeleted:false
        }
    }]);
    let quotes = QuotesModel.aggregatePaginate(myAggregate,options);
    return quotes;
  };

  async updateQuotesPosition(){
    try {
      let currentQuote:any = await QuotesModel.findOne({isShowing:true});
      let nextQuote:any = await QuotesModel.findOne({createdAt:{$gt: currentQuote?.createdAt},isDeleted:false})
      if (nextQuote) {
        nextQuote.isShowing = true;
        currentQuote.isShowing = false;
        await currentQuote.save();
        await nextQuote.save();
        return
      }else{
      let quote:any = await QuotesModel.findOne({isDeleted:false}).sort('createdAt');
        quote.isShowing = true;
        if (currentQuote) {
          currentQuote.isShowing = false;
          await currentQuote.save();
        }
          await quote.save();
          return
      }
    } catch (error) {
      console.log(error);
    }
  }
}
const quotesAdminService = new QuotesService(); // Create an instance of categoryService

export default quotesAdminService; 
// export default new SpeakerService();

