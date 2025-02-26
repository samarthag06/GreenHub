import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdbyname: {
    type: String,
    required: true
  },
  createdbyemail: {
    type: String,
    required: true
  },
  greenCredits: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ['user', 'admin', 'manufacturer'],
    default: 'user'
  },
  greenCredits: {
    type: Number,
    default: 0
  },
  total_products_sold:
{
  type: Number,
  default : 0 
},
green_products_sold:
{
  type: Number,
  default : 0 
},
  isadmin:{
    type: Boolean,
    default: false
  },
  notification: {
    type: Array,
    default: []

},
mycart:{
type: Array,
default: []
}
,
seennotification: {
    type: Array,
    default: []
},
  purchaseHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  posts: [postSchema]  // ✅ Posts are now stored inside User
}, { timestamps: true });

export default mongoose.model('User', userSchema);