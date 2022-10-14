import sql from "../../../database/connection";
import { checkApiMethod,notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
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
      handleErrors(res);
    }
    return;
  }
  /************* END UPDATE A CERTAIN TASKS *************/
  /************* DELETE A CERTAIN TASKS *************/
  if (checkApiMethod(req, "DELETE")) {
    console.log('id', id)
    try {
      const task = (await sql`DELETE FROM tasks WHERE task_id = ${id} RETURNING *`)[0];
      res.json(task);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END DELETE A CERTAIN TASKS *************/
  notFound404(res)
}
