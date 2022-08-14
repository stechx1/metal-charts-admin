import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sellPercentageSchema = new Schema({
  commodity: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
  }, 
});

export default mongoose.models.sellpercentage ||
  mongoose.model("sellpercentage", sellPercentageSchema);
