import Participants from "./../models/participantsModel.js";
import Contest from "./../models/contestModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHander from "../utils/errorhander.js";

// get participants by Admin
export const getParticipants = catchAsyncErrors(async (req, res, next) => {
  const participants = await Participants.find({});
  return res.status(200).json({
    success: true,
    participants,
  });
});

// create participants by user
export const createParticipants = catchAsyncErrors(async (req, res, next) => {
  const { contest_id, handle_id, UPI_id } = req.body;
  const user = req.user;
  if (!contest_id) {
    return next(new ErrorHander("Please Enter Contest Id", 400));
  }
  if (!handle_id) {
    return next(new ErrorHander("Please Enter Handle Id", 400));
  }
  if (!UPI_id) {
    return next(new ErrorHander("Please Enter UPI Id", 400));
  }

  const contest = await Contest.find({ _id: contest_id });
  if (!contest) {
    return next(
      new ErrorHander("Contest Not Found.Check Your Contest Id.", 400)
    );
  }

  const participants = await Participants.find({
    $or: [
      { handle_id: handle_id },
      {user_id: user._id },
    ],
  });
  console.log(participants)
  if (participants.length <= 0) {
    console.log("creating new Participant");
    console.log(handle_id)
    await Participants.create({
      contest_id: contest_id,
      handle_id: handle_id,
      user_id: user._id,
      UPI_id: UPI_id,
    });
    return res.status(200).json({
      success: true,
      message: "Participants created successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "User already Participated",
    });
  }
});

// delete participants by admin
export const deleteParticipants = catchAsyncErrors(async (req, res, next) => {
  const participants = await Participants.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    success: true,
    participants,
  });
});

// check user history for participants
export const participantsHistory = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const participants = await Participants.find({ "user_id": user._id })
    .populate({
      path: "contest_id",
    })
  return res.status(200).json({
    success: true,
    participants,
  });
});
