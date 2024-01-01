
import mongoose, { Schema, model } from 'mongoose';
import {  UserInterface } from '../interfaces/UserInterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        default:null
    },
    guestId: {
        type: String,
        default:null
    },
    isEmailVerified: {
        type: Boolean,
        default: true
    },
    isAccountActive: {
        type: Boolean,
        default: true
    },
    account_type: [{
        type: String,
        default: 'Email'
    }],
    deviceId:{
        type:String,
        default:null
    },
    google_info: {
        social_id: {type:String,default:null},
        social_token:{type:String,default:null},
    },
    apple_info: {
        social_id: {type:String,default:null},
        social_token:{type:String,default:null},
       
    },
    lastLogin:{
        type:Date
    }
    
}, { timestamps: true });
userSchema.plugin(aggregatePaginate);

const UserModel = model<UserInterface,mongoose.AggregatePaginateModel<UserInterface>>('user', userSchema);
export default UserModel;