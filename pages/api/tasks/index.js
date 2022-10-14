import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors} from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  /************* GET ALL TASKS *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const tasks = await sql`SELECT * FROM tasks ORDER BY task_id ASC`;
      res.send(tasks);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET ALL TASKS *************/
  /************* CREATE NEW TASKS *************/
  if (checkApiMethod(req, "POST")) {
    const { student_id, title, date, description, remarks, completed } =
      req.body;
    const newTask = {
      student_id,
      title,
      date,
      description,
      remarks,
      completed,
    };
    try {
      const task = (await sql`INSERT INTO tasks ${sql(newTask)} RETURNING *`)[0];
      res.json(task);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END CREATE NEW TASKS *************/
  notFound404(res)
}
