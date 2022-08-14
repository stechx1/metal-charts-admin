import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  username: {
    type: String,
    required: true,
    uniqe: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  referral: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  token: {
    type: String,
    required: true
  },
  status:{
    type: String,
    default: "pending"
  },
  commodity:{
    gold:{
      type: Number,
      default: 0 // ounces
    },
    ukoil:{
      type: Number,
      default:0 // barrels
    }
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
