import "dotenv/config";

const validateUser = (req, res) => {
  try {
    //TO_DO
    res.send(`valdidateUser Controller Called with ${req.userId}`);
  } catch (error) {
    console.log(error);
  }
};

const populateRequest = (req, res, next, userId) => {
  req.userId = userId;
  next();
};

export { validateUser, populateRequest };
