import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors} from "../../../utility";
export default async function handler(req, res) {

  console.log(req.method,req.url);
  /************* GET ALL CERTAIN DEPENDENT *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const dependents = await sql`SELECT * FROM dependents ORDER BY dependent ASC;`;
      res.send(dependents.rows);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return
  }
  /************* END GET ALL CERTAIN DEPENDENT *************/
  /************* CREATE A NEW DEPENDENT *************/
  if (checkApiMethod(req, "POST")) {
    const { sponsor_id, age, relation } = req.body
    const newDependent = { sponsor_id, age, relation } 
    try {
        const dependent = (await sql`INSERT INTO dependents ${sql(newDependent)} RETURNING *`)[0]
        res.json(dependent)
    } catch (error) {
        console.log(error)
        handleErrors(res)
    }
    return
  }
  /************* END CREATE A NEW DEPENDENT *************/
  notFound404(res)
}
