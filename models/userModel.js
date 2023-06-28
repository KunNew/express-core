import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import _ from "lodash";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.checkAvatar = async function (enteredAvatar) {
  if (!_.isEmpty(this.avatar)) {
    fs.unlink(this.avatar, (error) => {
      if (error) return;
    });
  }
  return enteredAvatar;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.pre("remove", function () {
  if (!_.isEmpty(this.avatar)) fs.unlinkSync(this.avatar);
  else return;
});

const User = mongoose.model("User", userSchema);

export default User;
