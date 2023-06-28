import mongoose from "mongoose";
import fs from "fs";
import _ from "lodash";
const productSchema = mongoose.Schema(
  {
    // color: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Color",
    // },
    // model: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Model",
    // },
    name: {
      type: String,
      required: true,
    },
    // availableUnit: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    // salePrice: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    photo: {
      type: String,
      //   default: "no-photo.jpg",
    },
  },
  {
    timestamps: true,
  }
);
productSchema.pre("remove", function () {
  if (!_.isEmpty(this.photo)) fs.unlinkSync(this.photo);
  else return;
});

const Product = mongoose.model("Product", productSchema);

export default Product;
