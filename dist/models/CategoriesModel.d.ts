/// <reference types="mongoose-aggregate-paginate-v2" />
import { AggregatePaginateModel } from 'mongoose';
import { categoryInterface } from '../interfaces/CategoryInterface';
declare const CategoryModel: AggregatePaginateModel<categoryInterface>;
export default CategoryModel;
