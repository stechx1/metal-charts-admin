import mongoose from "mongoose";
const Schema = mongoose.Schema;

const kycSchema = new Schema({
  token: {
    type: String,
    required: true,
    uniqe: true,
    sparse: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  dob: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.kyc || mongoose.model("kyc", kycSchema);
