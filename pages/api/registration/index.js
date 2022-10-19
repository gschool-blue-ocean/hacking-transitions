import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  const  {regCode}  = req.body;
  /************* GET A CERTAIN COHORT INFORMATION *************/
  if (checkApiMethod(req, "POST")) {
    try {
      const cohort = (await sql`SELECT * FROM cohorts WHERE register_code = ${regCode};`);
      res.status(200).send(cohort)
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
}
   /************* END GET A CERTAIN COHORT INFORMATION *************/