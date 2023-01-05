import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Contest from "../models/contestModel.js";
import Ranking from "./../models/rankingModel.js";
import Participants from "./../models/participantsModel.js";
import ErrorHander from "../utils/errorhander.js";
import axios from "axios";

export const getRanking = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const contest = await Contest.findOne({ contest_id: id });
  if (!contest) {
    return next(new ErrorHander("Please Enter Correct Contest Id", 400));
  }
  // if ranking find in database
  const ranking = await Ranking.findOne({contest_id:contest._id});
  if(ranking){
    return res.status(200).json({
        success: true,
        ranking,
      });
  }
  const participants = await Participants.find({ contest_id: contest._id });
  if (participants.length <= 0) {
    return next(
      new ErrorHander("No Participants Participated in contest.", 400)
    );
  }

  let allParticipants = [];
  for (let participant of participants) {
    allParticipants.push(participant.handle_id);
  }

  let stringParticipants = allParticipants.join(";");
  var config = {
    method: "get",
    url: `https://codeforces.com/api/contest.standings?contestId=${id}&handles=${stringParticipants}`,
    headers: {},
  };

  const axiosResponse = await axios(config).then(function (response) {
    return response.data;
  });
  if(axiosResponse.status === "OK"){
    let count = 1 ;
    let ranking = {
      contest_id: contest._id,
      users: []
    };
    for(let user of axiosResponse.result["rows"]){
      const participent = await Participants.findOne({handle_id:user["party"]["members"][0]["handle"]})
      if(participent){
        ranking.users.push({participant_id:participent._id,rank: count})
        count++;
      }
    }
    const rankings = await Ranking.create(ranking)
    return res.status(200).json({
      success: true,
      rankings
    });
  }
  else{
    return next(
      new ErrorHander(axiosResponse.comment, 400)
    );
  }
  
  
});

export const deleteRanking = catchAsyncErrors(async (req, res, next) => {
  const ranking = await Ranking.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    success: true,
    ranking,
  });
});
