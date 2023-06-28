import mongoose from "mongoose";
const saleDetailModel = mongoose.Schema(
  {
    sale: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Sale",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const SaleDetail = mongoose.model("SaleDetail", saleDetailModel);

export default SaleDetail;
