import sql from "../../../database/connection";
import { checkApiMethod } from "../../../utility";
export default async function handler(req, res) {

  if (checkApiMethod(req, "GET")) {
    try {
      const dependents = await sql`SELECT * FROM dependents ORDER BY dependent ASC;`;
      res.send(dependents.rows);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return
  }
  if (checkApiMethod(req, "POST")) {
    const { sponsor_id, age, relation } = req.body
    const newDependent = { sponsor_id, age, relation } 
    try {
        const dependent = (await sql`INSERT INTO dependents ${sql(newDependent)} RETURNING *`)[0]
        res.json(dependent)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    return
  }
}
