import "dotenv/config";
import fetch from "node-fetch";

const get_CF_contest_standings = async (req, res) => {
  try {
    res.send("Codeforces contest ranking");
  } catch (error) {
    console.log(error);
  }
};


export { get_CF_contest_standings };
