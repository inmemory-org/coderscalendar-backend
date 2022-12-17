import "dotenv/config";

const validateUser = (req, res) => {
  try {
    //TO_DO
    res.send(`valdidateUser Controller Called with ${req.username}`);
  } catch (error) {
    console.log(error);
  }
};

const populateRequestWithUsername = (req, res, next, username) => {
  req.username = username;
  next();
};

export { validateUser, populateRequestWithUsername };
