import sql from "../../../../database/connection";
import { checkApiMethod, handleErrors, notFound404 } from "../../../../utility";

export default async function handler(req, res) {
  const { slug } = req.query;
  console.log(slug);
  //get Archived cohorts//

  if (checkApiMethod(req, "GET") && slug) {
    try {
      let searchCohorts =
        await sql`SELECT * FROM cohorts WHERE archived = true AND cohort_name = ${slug}`;
      res.json(searchCohorts);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res);
}
