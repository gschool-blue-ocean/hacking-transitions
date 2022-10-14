import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  const { id } = req.query;
  /************* UPDATE A CERTAIN DEPENDENTS INFORMATION *************/
  if (checkApiMethod(req, "PATCH")) {
    const { age, relation } = req.body;
    const newDependent = { age, relation };
    try {
      const dependent = (
        await sql`UPDATE dependents SET ${sql(
          newDependent
        )} WHERE dependent_id = ${id} RETURNING *`
      )[0];
      res.json(dependent);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END UPDATE A CERTAIN DEPENDENTS INFORMATION *************/
  /************* DELETE A CERTAIN DEPENDENT *************/
  if (checkApiMethod(req, "DELETE")) {
    try {
      const dependent = (
        await sql`DELETE FROM dependents WHERE dependent_id = ${id} RETURNING *`
      )[0];
      res.json(dependent);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END DELETE A CERTAIN DEPENDENT *************/
  notFound404(res)
}
