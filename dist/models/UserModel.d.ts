/// <reference types="mongoose-aggregate-paginate-v2" />
import mongoose from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface';
declare const UserModel: mongoose.AggregatePaginateModel<UserInterface>;
export default UserModel;
