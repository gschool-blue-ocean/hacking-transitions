import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../../utility";
export default async function handler(req, res) {
  console.log(req.method, req.url);
  const { cohortid } = req.query;

  // !!!!!! allows patching of just the cohort passcodes, temp solution.

  /************* GET A CERTAIN COHORT INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const cohort =
        await sql`SELECT * FROM cohorts WHERE cohort_id = ${cohortid};`;
      res.json(cohort);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET A CERTAIN COHORT INFORMATION *************/
  /************* UPDATE A CERTAIN COHORT INFORMATION *************/
  if (checkApiMethod(req, "PATCH")) {
    const { register_code } = req.body;

    const newCohort = { register_code };
    try {
      const cohort = (
        await sql`UPDATE cohorts SET ${sql(
          newCohort
        )} WHERE cohort_id = ${cohortid} RETURNING *`
      )[0];
      res.json(cohort);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
  }
  /************* END UPDATE A CERTAIN COHORT INFORMATION *************/
  /************* DELETE A CERTAIN COHORT *************/
  if (checkApiMethod(req, "DELETE")) {
    try {
      const cohort = (
        await sql`DELETE FROM cohorts WHERE cohort_id = ${cohortid} RETURNING *`
      )[0];
      res.json(cohort);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END DELETE A CERTAIN COHORT *************/
  notFound404(res);
}
