import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  const { id } = req.query;
  /************* GET ALL USERS FROM A CERTAIN COHORT *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const users = await sql`SELECT * FROM users WHERE cohort_id = ${id}`;
      res.json(users);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET ALL USERS FROM A CERTAIN COHORT *************/
  notFound404(res)
}
