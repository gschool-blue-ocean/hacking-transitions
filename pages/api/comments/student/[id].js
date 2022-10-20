import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../../utility";
export default async function handler(req, res) {
  console.log(req.method, req.url);
  const { id } = req.query;

  /************* GET ALL COMMENTS FROM A CERTAIN STUDENT *************/
  if (checkApiMethod(req, "GET") && typeof parseInt(id) === "number") {
    try {
      const comments =
        await sql`SELECT * FROM comments WHERE student_id = ${id} OR cohort_id = (SELECT cohort_id FROM users WHERE user_id = ${id}) ORDER BY comment_id ASC`;
      res.json(comments);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET ALL COMMENTS FROM A CERTAIN STUDENT *************/
  /************* DELETE ALL COMMENTS FROM A CERTAIN STUDENT *************/
  if (checkApiMethod(req, "DELETE") && typeof parseInt(id) === "number") {
    try {
      const comments = (
        await sql`DELETE FROM comments WHERE student_id = ${id} RETURNING *`
      )[0];
      res.json(comments);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END DELETE ALL COMMENTS FROM A CERTAIN STUDENT *************/
  notFound404(res);
}
