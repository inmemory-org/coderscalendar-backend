// import ErrorHander from "../utils/errorhander";
// import catchAsyncErrors from "./catchAsyncErrors.js";
// import { verify } from "jsonwebtoken";
// import { findById } from "../models/userModel";

// export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return next(new ErrorHander("Please Login to access this resource", 401));
//   }

//   const decodedData = verify(token, process.env.JWT_SECRET);

//   req.user = await findById(decodedData.id);

//   next();
// });

// export function authorizeRoles(...roles) {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHander(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// }