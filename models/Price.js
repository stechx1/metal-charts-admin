import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const priceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
  },
  updated_at:{
      type: Date,
      default: Date.now()
  }
});


export default mongoose.models.price || mongoose.model('price', priceSchema)