import { Schema, model } from "mongoose";

const contestSchema = new Schema({
  id: {
    type: String,
    required: [true, "Please Enter contest ID"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Please Enter contest Name"],
  },
  url: {
    type: url,
    required: [true, "Please Enter contest Registration URL"],
    unique: true
  },
  start_time: {
    type: String,
    required: [true, "Please Enter contest Start Time"],
  },
  status: {
    type: String,
    required: [true, "Please Enter contest Status: 'FINISHED' or 'BEFORE'"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default model("Contest", contestSchema);