import mongoose from "mongoose";
const Schema = mongoose.Schema;

const buySchema = new Schema({
  // cookie token
  seller: {
    type: String,
    required: true,
  },
  buyer: {
    type: String,
    required: true,
  },
  trx_id: {
    //buyer trx id via p2p
    type: String,
    default: "waiting",
  },
  orderid: {
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

export default mongoose.models.buyp2p || mongoose.model("buyp2p", buySchema);
