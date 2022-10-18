import sql from "../../../../database/connection";
import { checkApiMethod } from "../../../../utility";
export default async function handler(req, res) {
   const { id } = req.query;
  /************* ARCHIVE STUDENTS *************/
    if (checkApiMethod(req, "PATCH")) {
      try {
        const users = await sql`UPDATE users SET archived = true WHERE user_id = ${id};`;
        console.log('got it')
        res.send('updated');
      } catch (error) {
        console.log(error);
        handleErrors(res);
      }
      return;
    }
}