const { required } = require("joi");
const mongoose = require("mongoose");

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
        tenantId:{type:String,required:true,unique:true}
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "dropdownData",
    dropDownDataSchema,
    "dropdownData"
);
