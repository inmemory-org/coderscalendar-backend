import express from "express";
const router = express.Router();
import {
  validateUser,
  populateRequest,
} from "../controllers/userValidation.js";

router.param("userId", populateRequest);
router.get("/validate-user/:userId", validateUser);

export default router;
