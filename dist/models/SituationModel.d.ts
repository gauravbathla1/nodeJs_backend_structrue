/// <reference types="mongoose-aggregate-paginate-v2" />
import { AggregatePaginateModel } from 'mongoose';
import { SituationInterface } from '../interfaces/SituationInterface';
declare const SituationModel: AggregatePaginateModel<SituationInterface>;
export default SituationModel;
