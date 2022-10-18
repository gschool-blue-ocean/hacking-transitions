import sql from "../../../../database/connection";
import { checkApiMethod, handleErrors, notFound404 } from "../../../../utility";

export default async function handler(req, res) {
  const { slug } = req.query;
  console.log("typeof", typeof slug);
  console.log("this is the slug", slug);
  //get Archived students by name//

  if (checkApiMethod(req, "GET") && slug) {
    try {
      const name = slug[0].split("-");
      let searchStudents =
        await sql`SELECT * FROM users WHERE admin = false AND archived = true AND first = ${name[0]} AND last = ${name[1]}`;
      res.json(searchStudents);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res);
}
