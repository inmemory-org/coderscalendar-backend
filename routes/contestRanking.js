import express from "express";
import {
  getCodeforcesRanking,
  populateRequestWithContestId,
} from "../controllers/contestRanking.js";
const router = express.Router();

router.param("contestID", populateRequestWithContestId);
router.get("/contest/:contestID/ranking", getCodeforcesRanking);

export default router;
