import mongoose from "mongoose";
const Schema = mongoose.Schema;

const balanceSchema = new Schema({
  commodity: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.balance || mongoose.model("balance", balanceSchema);
