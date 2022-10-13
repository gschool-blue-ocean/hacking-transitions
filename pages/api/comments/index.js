import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  
  /******** GET ALL COMMENTS ********/
  if (checkApiMethod(req, "GET")) {
    try {
      const comments = await sql`SELECT * FROM comments ORDER BY comment_id ASC;`;
      res.json(comments);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /******** END GET ALL COMMENTS ********/
  /******** CREATE NEW COMMENTS ********/
  if (checkApiMethod(req, "POST")) {
    const { student_id, author_id, author_name, content, date_time, cohort_id } = req.body
    const newComment = {  student_id, author_id, author_name, content, date_time };
    newComment.cohort_id = cohort_id !== undefined ? cohort_id:null
    try {
      const comment = (
        await sql`INSERT INTO comments ${sql(newComment)} RETURNING *`
      )[0];
      
      res.json(comment);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /******** END CREATE NEW COMMENTS ********/
  notFound404(res);
}
