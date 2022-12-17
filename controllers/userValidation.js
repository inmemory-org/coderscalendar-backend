import "dotenv/config";
import fetch from "node-fetch";

const validateUser = async (req, res) => {
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${req.username}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
  })

  const responseJSON = await response.json();
  const userProfileStatus = responseJSON.status;
  const userProfileResult = responseJSON.result[0];
  if(userProfileStatus === 'OK')
    res.send(`Hi ${userProfileResult.rank}`);
  else
    res.send(responseJSON.comment);


  } catch (error) {
    console.log(error);
  }
};



const populateRequestWithUsername = (req, res, next, username) => {
  req.username = username;
  next();
};

export { validateUser, populateRequestWithUsername };
