import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  const { id } = req.query;
  /************* GET ALL USERS FROM A CERTAIN COHORT *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const users = (await sql`SELECT * FROM users WHERE cohort_id = ${id}`)[0];
      res.json(users);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res)
}
