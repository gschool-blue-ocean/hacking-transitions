import sql from "../../../../database/connection";
import { checkApiMethod, handleErrors, notFound404 } from "../../../../utility";

export default async function handler(req, res) {
  const { slug } = req.query;
  //console.log("typeof", typeof slug);
  //console.log("this is the slug", slug);
  //get Archived students by name//

  if (checkApiMethod(req, "GET") && slug) {
    try {
      //no space in URL make sure to split on dash
      const name = slug[0].split("-");
      //make not case sensitive
      const first =
        name[0].charAt(0).toUpperCase() + name[0].slice(1).toLowerCase();

      const last =
        name[1].charAt(0).toUpperCase() + name[1].slice(1).toLowerCase();

      //actual search
      let searchStudents =
        await sql`SELECT * FROM users WHERE admin = false AND archived = true AND first = ${first} AND last = ${last}`;
      res.json(searchStudents);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res);
}
