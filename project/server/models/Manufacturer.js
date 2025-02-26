import mongoose from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  greenRatio: {
    type: Number,
    default: 0
  },
  totalProductsSold: {
    type: Number,
    default: 0
  },
  greenProductsSold: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Manufacturer', manufacturerSchema);