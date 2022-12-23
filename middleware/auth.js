import ErrorHander from "../utils/errorhander.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import { verify } from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this page", 401));
  }

  const decodedData = verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `${req.user.role} is not allowed to access this page`,
          403
        )
      );
    }

    next();
  };
}