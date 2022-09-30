import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
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
  notFound404(res)
}
