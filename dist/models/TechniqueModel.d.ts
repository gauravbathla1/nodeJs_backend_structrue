/// <reference types="mongoose-aggregate-paginate-v2" />
import * as mongoose from 'mongoose';
import { Technique } from '../interfaces/Techniqueinterface';
declare const TechniqueModel: mongoose.AggregatePaginateModel<Technique>;
export default TechniqueModel;
