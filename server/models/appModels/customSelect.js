import mongoose from "mongoose";
const childSchema = new mongoose.Schema({
    label: String,
    value: String,
});

const dropDownDataSchema = new mongoose.Schema(
    {
        entityName: {
            type: String,
            required: true,
        },
        data: [childSchema],
        tenantId:{type:String,required:true,}
    },
    { timestamps: true }
);

export default mongoose.model("customSelect",dropDownDataSchema,"customSelect");
