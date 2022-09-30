import sql from "../../../../database/connection";
import { checkApiMethod,notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  const { id } = req.query;
  /************* GET ALL TASKS FROM A CERTAIN STUDENT *************/
  if (checkApiMethod(req, "GET") && typeof parseInt(id) === "number") {
    try {
      const tasks =
        await sql`SELECT * FROM tasks WHERE student_id = ${id} ORDER BY task_id ASC`;
      res.json(tasks);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* DELETE ALL TASKS FROM A CERTAIN STUDENT *************/
  if (checkApiMethod(req, "DELETE") && typeof parseInt(id) === "number") {
    try {
      const tasks =
        (await sql`DELETE FROM tasks WHERE student_id = ${id} RETURNING *`)[0];
      res.json(tasks);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  notFound404(res)
}
