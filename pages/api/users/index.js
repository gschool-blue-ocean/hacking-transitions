import sql from "../../../database/connection";
import { checkApiMethod } from "../../../utility";
export default async function handler(req, res) {
  if (checkApiMethod(req, "GET")) {
    try {
      const users = await sql`SELECT * FROM users ORDER BY user_id ASC;`;
      res.send(users.rows);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return
  }
}
