import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method, req.url);
  /******** GET ALL ACTIVE COHORTS ********/
  if (checkApiMethod(req, "GET")) {
    try {
      let cohorts = await sql`SELECT * FROM cohorts WHERE archived = false ORDER BY cohort_id ASC;`;
      res.json(cohorts);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /******** END GET ALL ACTIVE COHORTS ********/
  /******** CREATE NEW COHORTS ********/
  if (checkApiMethod(req, "POST")) {
    const { cohort_name, start_date, end_date, active, archived, register_code } = req.body;
    const newCohort = { cohort_name, start_date, end_date, active, archived, register_code };
    try {
      let cohort = (
        await sql`INSERT INTO cohorts ${sql(newCohort)} RETURNING *`
      )[0];
      res.json(cohort);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /******** END CREATE NEW COHORTS ********/
  notFound404(res);
}