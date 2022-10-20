import sql from "../../../../database/connection";
import { checkApiMethod, handleErrors, notFound404 } from "../../../../utility";

export default async function handler(req, res) {
  //get Archived student list by Class Name
  const { slug } = req.query;
  console.log(slug);
  if (checkApiMethod(req, "GET")) {
    try {
      let list =
        await sql`SELECT * FROM users WHERE admin = false AND archived = true AND cohort_name = ${slug[0]};`;
      res.json(list);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res);
}
