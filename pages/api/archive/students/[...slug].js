import sql from "../../../../database/connection";
import { checkApiMethod, handleErrors, notFound404 } from "../../../../utility";

export default async function handler(req, res) {
  const { slug } = req.query;

  //get Archived students by name//

  if (checkApiMethod(req, "GET") && slug) {
    try {
      slug.split(" ");
      let searchStudents =
        await sql`SELECT * FROM users WHERE admin = false AND archived = true AND first = ${slug[0]} AND last = ${slug[1]}`;
      res.json(searchStudents);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res);
}
