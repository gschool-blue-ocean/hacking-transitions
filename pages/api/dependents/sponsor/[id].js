import sql from "../../../database/connection";
import { checkApiMethod } from "../../../utility";
export default async function handler(req, res) {
  const { id } = req.query;
  if (checkApiMethod(req, "GET") && typeof parseInt(id) === "number") {
    try {
      let dependents = await sql(
        `SELECT * FROM dependents WHERE sponsor_id = ${id} ORDER BY dependent_id ASC`
      );
      res.json(dependents);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return;
  }
  if (checkApiMethod(req, "DELETE") && typeof parseInt(id) === "number") {
    try {
      const dependents = sql`DELETE FROM dependents WHERE sponsor_id = ${id} RETURNING *`;
      res.json(dependents);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return;
  }
}
