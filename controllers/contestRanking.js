import "dotenv/config";
import fetch from "node-fetch";

const populateRequestWithContestId = (req, res, next, contestId) => {
  req.contestId = contestId;
  next();
};

const getCodeforcesRanking = (req, res) => {
  try {
    // let contestId = req.contestId;
    let url = `https://codeforces.com/api/contest.ratingChanges?contestId=${req.contestId}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    console.log(error);
  }
};

export { getCodeforcesRanking, populateRequestWithContestId };
