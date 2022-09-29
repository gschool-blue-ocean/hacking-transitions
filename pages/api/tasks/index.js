import sql from "../../../database/connection";
import { checkApiMethod } from "../../../utility";
export default async function handler(req, res) {
  if (checkApiMethod(req, "GET")) {
    try {
      const tasks = await sql`SELECT * FROM tasks ORDER BY task_id ASC`;
      res.send(tasks);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return
  }
}
