import { Schema, model } from "mongoose";

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } },
  },
  {
    timestamps: true,
    collection: "Token",
  }
);

export default model("Token", TokenSchema);
