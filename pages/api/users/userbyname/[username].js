import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../../utility";


export default async function handler(req, res) {
  console.log("req", req.query)
  const { username } = req.query;
  console.log(username)
  /************* GET A CERTAIN USER INFORMATION *************/
  if (checkApiMethod(req, "POST")) {
    try {
      const user = (await sql`SELECT * FROM users WHERE username = ${username}`)[0];
      res.json(user);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return; 
  }
}