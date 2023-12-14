import mongoose from "mongoose";

const productStatsSchema = new mongoose.Schema(
    {
        productId: String,
        yearSalesTotal: Number,
        yearTotlaSoldUnit: Number,
        year: Number,
        montlyData: [
            {
                month:String,
                totalSale:Number,
                totalUnits:Number
            }
        ],
        dailyData:[
            {
                day:String,
                totalSale:Number,
                totalUnits:Number
            }
        ],
    },
    { timestamps: true }
);

export default mongoose.model("productStats", productStatsSchema);
