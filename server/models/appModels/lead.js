import mongoose, { model } from "mongoose";

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
    company: {
        type: mongoose.Schema.ObjectId, ref: 'coustomer', autopopulate: true ,
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
});

 export default mongoose.model("lead",leadSchema)