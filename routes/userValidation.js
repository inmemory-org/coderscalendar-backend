import express from "express";
const router = express.Router();
import {
  validateUser,
  populateRequestWithUserId,
} from "../controllers/userValidation.js";

router.param("userId", populateRequestWithUserId);
router.get("/validate-user/:userId", validateUser);

export default router;
