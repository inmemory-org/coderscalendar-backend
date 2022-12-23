import Contest from "../models/contestModel.js";
import ErrorHander from "../utils/errorhander.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";


// ------------ Fetch All Contests ------------ Everyone
export const getAllContests = catchAsyncErrors(async (req, res, next) => {

    const contests = await Contest.find();

    res.status(200).json({
        success: true,
        contests
    })
});

// ------------ Create Contest ------------ Admin
export const createContest = catchAsyncErrors(async (req, res, next) => {

    const contest = await Contest.create(req.body);

    res.status(201).json({
        success: true,
        contest
    })
});

// ------------ Update Contest ------------ Admin
export const updateContest = catchAsyncErrors(async (req, res, next) => {

    let contest = await Contest.findById(req.params.id);

    if (!contest) {
      return next(new ErrorHander("Product not found", 404));
    }
    
    contest = await Contest.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        contest,
      });
});

// ------------ Delete Contest ------------ Admin
export const deleteContest = catchAsyncErrors(async (req, res, next) => {
    const contest = await Contest.findById(req.params.id);

    if (!contest) {
      return next(new ErrorHander("Product not found", 404));
    }

    await contest.remove();

    res.status(200).json({
      success: true,
      message: "Contest Deleted Successfully",
    });
});
