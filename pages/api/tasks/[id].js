import sql from "../../../database/connection";
import { checkApiMethod } from "../../../utility";
export default async function handler(req, res) {
  const { id } = req.query;
  /************* UPDATE A CERTAIN TASKS *************/
  if (checkApiMethod(req, "PATCH")) {
    const { title, date, description, remarks, completed } = req.body;
    const newTask = { title, date, description, remarks, completed };
    try {
      const task = (
        await sql`UPDATE tasks SET ${sql(
          newTask
        )} WHERE task_id = ${id} RETURNING *`
      )[0];
      res.json(task);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return;
  }
  /************* DELETE A CERTAIN TASKS *************/
  if (checkApiMethod(req, "DELETE")) {
    try {
      const task = (await sql`DELETE FROM tasks WHERE task_id = ${id}`)[0];
      res.json(task);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    return;
  }
}
