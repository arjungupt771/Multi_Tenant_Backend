import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    plan:{
        type:String,
        enum:["free","pro","enterprise"],
        default:"free"
    }
}, {timestamps:true});

export const Organization = mongoose.model("Organization", OrganizationSchema)