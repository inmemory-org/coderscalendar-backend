import "dotenv/config";
import fetch from "node-fetch";

const getCodeforcesRanking = async (req, res) => {
  try {
    const response = await fetch(`https://codeforces.com/api/contest.ratingChanges?contestId=${req.contestID}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
  })
  
    const responseJSON = await response.json();
    res.send(responseJSON);

  } catch (error) {
    console.log(error);
  }
};

const populateRequestWithContestId = (req, res, next, contestID) => {
  req.contestID = contestID;
  next();
};

export { getCodeforcesRanking, populateRequestWithContestId };
