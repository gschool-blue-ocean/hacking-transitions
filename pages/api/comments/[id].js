import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method, req.url);

  const { id } = req.query;
  /************* GET A CERTAIN COMMENTS INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      console.log(comment, id);
      const comment = await sql`SELECT * FROM comments WHERE comment_id = ${id};`;

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
    const { content } = req.body
    const newcomment = { content };
    try {
      const comment = (await sql`UPDATE comments SET ${sql(
        newcomment
      )} WHERE comment_id = ${id} RETURNING *`)[0];
      res.json(comment);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return
  }
  /************* END UPDATE A CERTAIN COMMENTS INFORMATION *************/
  /************* DELETE A CERTAIN COMMENTS *************/
  if (checkApiMethod(req, "DELETE")) {
    try {
      const comment = (
        await sql`DELETE FROM comments WHERE comment_id = ${id} RETURNING *`
      )[0];
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
