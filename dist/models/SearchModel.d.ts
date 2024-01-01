/// <reference types="mongoose-aggregate-paginate-v2" />
import { AggregatePaginateModel } from 'mongoose';
import { quotesInterface } from '../interfaces/QutesInterface';
declare const SearchModel: AggregatePaginateModel<quotesInterface>;
export default SearchModel;
