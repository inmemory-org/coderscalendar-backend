import express from "express";
import {
  getCodeforcesRanking,
  populateRequestWithContestId,
} from "../controllers/contestRanking.js";
const router = express.Router();

router.param("contestId", populateRequestWithContestId);
router.get("/contest/cf/:contestID/ranking", getCodeforcesRanking);

export default router;
