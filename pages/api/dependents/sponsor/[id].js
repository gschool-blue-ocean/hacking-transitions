import sql from "../../../../database/connection";
import { checkApiMethod, notFound404} from "../../../utility";
export default async function handler(req, res) {
  const { id } = req.query;
  /************* GET ALL DEPENDENTS FROM A CERTAIN SPONSOR *************/
  if (checkApiMethod(req, "GET") && typeof parseInt(id) === "number") {
    try {
      let dependents =
        await sql`SELECT * FROM dependents WHERE sponsor_id = ${id} ORDER BY dependent_id ASC`;
      res.json(dependents);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return;
  }
  /************* DELETE ALL DEPENDENTS FROM A CERTAIN SPONSOR *************/
  if (checkApiMethod(req, "DELETE") && typeof parseInt(id) === "number") {
    try {
      const dependents =
        (await sql`DELETE FROM dependents WHERE sponsor_id = ${id} RETURNING *`)[0];
      res.json(dependents);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return;
  }
  notFound404(res)
}
