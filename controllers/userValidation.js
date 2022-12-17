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
  // TODO : Check username value if there's any semicolon (;) exists in username, if exists show error (invalid username entered) 
  const responseJSON = await response.json();
  const userProfileStatus = responseJSON.status;

  if(userProfileStatus === 'OK') {
    const userProfileResult = responseJSON.result[0];
    res.send(`Hi ${userProfileResult.rank !== undefined? userProfileResult.rank : "unrated"} ${userProfileResult.handle}`);
  }
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
