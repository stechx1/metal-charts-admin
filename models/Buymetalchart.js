import mongoose from "mongoose";
const Schema = mongoose.Schema;

const buySchema = new Schema({
  buyer: {
    //buyer token
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  // type of commodity
  commodity: {
    type: String,
    required: true,
  },
  payment: {
    //payment trx id
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.buymetalchart ||
  mongoose.model("buymetalchart", buySchema);
