import mongoose, {Schema} from "mongoose";

import {ROLES} from "../constants/roles.js";
import { type } from "os";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        select:false  // critical for security
    },
    role:{
        type:String,
        enum: Object.values(ROLES),
        default:ROLES.USER
    },
    organizationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required:true,
        index:true
    }


},{timestamps:true});

UserSchema.index({email:1, organizationId:1}, {unique:true});

export const User = mongoose.model("User", UserSchema);
