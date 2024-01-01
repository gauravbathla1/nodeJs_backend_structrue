import { Schema, model,AggregatePaginateModel } from 'mongoose';
import { quotesInterface } from '../interfaces/QutesInterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const quoteSchema = new Schema({
    quote: {
        type: String,
        default:null,
    },
    isActive: {
        type: Boolean,
        default:true,
    },
    isDeleted:{
        type: Boolean,
        default:false,
    }    ,
    isShowing:{
        type: Boolean,
        default:false,
    }
}, { timestamps: true });
quoteSchema.plugin(aggregatePaginate);
const QuoteModelModel = model<quotesInterface,AggregatePaginateModel<quotesInterface>>('quotes', quoteSchema);
export default QuoteModelModel;