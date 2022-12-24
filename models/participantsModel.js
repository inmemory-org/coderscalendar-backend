import { Schema, model } from "mongoose";

const participantsSchema = new Schema({
  contest_id: {
    type: Schema.Types.ObjectId,
    ref: "Contest",
    required: [true, "Please Enter contest ID"],
  },
  users: [
    {
      handle_id: {
        type: String,
        required: [true, "Please Enter handle ID"],
        unique: true,
      },
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
      },
      UPI_id: {
        type: String,
        required: [true, "Please Enter UPI ID"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Participants", participantsSchema);
