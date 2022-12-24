import Participants from "./../models/participantsModel.js";
import Contest from "./../models/contestModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

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
  const user = req.user
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

  const participants = await Participants.findOne({
    contest_id: contest_id,
  });

  if (!participants) {
    await Participants.create({
      contest_id: contest_id,
      users: [
        {
          handle_id: handle_id,
          user_id: user._id,
          UPI_id: UPI_id,
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Participants created successfully",
    });
  } else {
    for(let participant of participants.users){
       if(participant.handle_id == handle_id || participant.user_id.toString() == user._id.toString()) {
            return res.status(200).json({
                success: false,
                message: "User already Participated",
              });
        }
    }
    await Participants.updateOne(
      { contest_id: contest_id },
      {
        $push: {
          users: {
            handle_id: handle_id,
            user_id: user._id,
            UPI_id: UPI_id,
          },
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Participants updated successfully",
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
  const participants = await Participants.find({ "users.user_id": user._id })
    .populate({
      path: "contest_id",
    })
    .select("-users");
  return res.status(200).json({
    success: true,
    participants,
  });
});
