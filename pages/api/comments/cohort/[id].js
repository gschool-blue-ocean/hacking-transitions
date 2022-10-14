import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../../utility";
export default async function handler(req, res) {
  console.log(req.method, req.url);
  const { id } = req.query;
  /************* GET A CERTAIN COMMENTS INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const comment = await sql`WITH messages AS ( 
        SELECT * , ROW_NUMBER() 
        OVER ( PARTITION BY content, date_time, author_id) 
        AS rank FROM comments WHERE cohort_id = ${id}
    ) 
    SELECT * FROM messages WHERE rank = 1;`;

      res.json(comment);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET A CERTAIN COMMENTS INFORMATION *************/
  /************* UPDATE A CERTAIN COMMENTS INFORMATION *************/
  if (checkApiMethod(req, "PATCH")) {
    const { content, author_id, date_time } = req.body;

    const newcomment = { content };
    try {
      const comment = await sql`UPDATE comments SET ${sql(
        newcomment
      )} WHERE cohort_id = ${id} AND author_id = ${author_id} AND date_time= ${date_time} RETURNING *`;

      res.json(comment);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END UPDATE A CERTAIN COMMENTS INFORMATION *************/
  /************* DELETE A CERTAIN COMMENTS *************/
  if (checkApiMethod(req, "DELETE")) {
    try {
      const { author_id, date_time } = req.body;

      const comment =
        await sql`DELETE FROM comments  WHERE cohort_id = ${id} AND author_id = ${author_id} AND date_time= ${date_time} RETURNING *`;

      res.json(comment);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END DELETE A CERTAIN COMMENTS *************/
  notFound404(res);
}
