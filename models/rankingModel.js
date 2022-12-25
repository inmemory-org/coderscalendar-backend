import { Schema, model } from "mongoose";

const rankingSchema = new Schema({
  contest_id: {
    type: Schema.Types.ObjectId,
    ref: "Contest",
    required: [true, "Please Enter contest ID"],
  },
  users:[
    {
        participant_id: {
            type: Schema.Types.ObjectId,
            ref: "Participants",
            required: [true, "Please Enter Participants ID"],
        },
        rank:{
            type: Number,
            default: 0
        }

    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Ranking", rankingSchema);



// -- getRanking (contestID) - (User, Admin, without login wala bhi dekh sakta h)
// -- deleteRanking (contestID) - (Admin)
