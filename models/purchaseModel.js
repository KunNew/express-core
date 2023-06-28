import mongoose from "mongoose";
const purchaseSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    datePurchase: {
      type: Date,
      required: true,
    },
    purchaseUnit: {
      type: Number,
      required: true,
      default: 0,
    },
    pricePerUnit: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
