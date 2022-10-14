import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../../utility";
export default async function handler(req, res) {
  console.log(req.method, req.url);
  const { id } = req.query;
  /************* GET A CERTAIN COHORT COMMENTS INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const comment = await sql`SELECT * FROM comments WHERE cohort_id=${id}`;

      res.json(comment);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET A CERTAIN COHORT COMMENTS INFORMATION *************/
  
  notFound404(res);
}
