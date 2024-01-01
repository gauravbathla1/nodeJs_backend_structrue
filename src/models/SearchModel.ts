import { Schema, model,AggregatePaginateModel } from 'mongoose';
import { quotesInterface } from '../interfaces/QutesInterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const searchSchema = new Schema({
    searchText: {
        type: String,
        default:null,
    },
}, { timestamps: true });
searchSchema.plugin(aggregatePaginate);
const SearchModel = model<quotesInterface,AggregatePaginateModel<quotesInterface>>('search', searchSchema);
export default SearchModel;