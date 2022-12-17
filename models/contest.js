import { mongoose } from "mongoose";
const { Schema } = mongoose;

const ContestSchema = new Schema({
  contest_name: {
    type: String,
  },
  contest_id: {
    type: String,
  },
});
