const mongoose = require("mongoose");
const orderProductSchema=mongoose.Schema({
  buyQuantity:Number,
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
  }
});




const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    // product: [orderProductSchema],
    item:[orderProductSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    address:{
      type:String,
      required:true,
    },
    number:{
      type:Number,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "dispatched", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderr", orderSchema);
