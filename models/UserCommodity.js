import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userCommodity = new Schema({
  token: {
    type: String,
    required: true,
  },
  commodity: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.user_commodity ||
  mongoose.model("user_commodity", userCommodity);
