import sql from "../../../../database/connection";
import { checkApiMethod, notFound404 } from "../../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  /************* GET ALL USERS THAT HAVE A COHORT/ARE STUDENTS NOT ADMIN *************/
    if (checkApiMethod(req, "GET")) {
      try {
        const users = await sql`SELECT * FROM users WHERE admin = false ORDER BY user_id ASC;`;
        res.send(users);
      } catch (error) {
        console.log(error);
        handleErrors(res);
      }
      return;
    }
    notFound404()
}