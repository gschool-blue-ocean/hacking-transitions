import sql from "../../../../database/connection";
import { checkApiMethod, handleErrors, notFound404 } from "../../../../utility";

export default async function handler(req, res) {
  //get Archived students//
  if (checkApiMethod(req, "GET")) {
    try {
      let students =
        await sql`SELECT * FROM users WHERE admin = false AND archived = true;`;
      res.json(students);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res);
}
