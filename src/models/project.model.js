import mongoose, {Schema} from "mongoose";
import { type } from "os";

const projectSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    organizationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        index:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

projectSchema.index({ name: 1, organizationId: 1 }, { unique: true });

export const Project = mongoose.model("Project", projectSchema);