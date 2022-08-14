import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sellSchema = new Schema({
  // cookie token
  seller: {
    type: String,
    required: true,
  },
  // selling to metalcharts/peer 2 peer
  tradewith: {
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
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "waiting",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.sell || mongoose.model("sell", sellSchema);
