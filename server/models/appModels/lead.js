import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const leadSchema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    source: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        autopopulate: true,
        require: true,
    },
    recivedDate: {
        type: Number,
        default: Math.floor(Date.now() / 1000),
    },
    comments: [
        {
            comment: String,
            date: Number,
        },
    ],
    tenantId:{
        type:String,
        required:true
    }
});

leadSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("lead",leadSchema)