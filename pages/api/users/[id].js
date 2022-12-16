import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  const { id } = req.query;
  /************* GET A CERTAIN USER INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const user = (
        await sql`SELECT * FROM users WHERE ${
          isNaN(parseInt(id)) ? sql`email = ${id}` : sql`user_id = ${id}`
        }`
      )[0];

      user ? res.json(user) : res.status(404).send("Not Found");
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET A CERTAIN USER INFORMATION *************/
  /************* UPDATE A CERTAIN USER INFORMATION *************/
  if (checkApiMethod(req, "PATCH")) {
    const {
      first,
      last,
      email,
      rank,
      branch,
      duty_station,
      taps_complete,
      leave_start_date,
      ets_date,
      planning_to_relocate,
      city,
      state,
      has_dependents,
      highest_education,
      seeking_further_education,
      mos,
      interests,
      final_physical,
      gear_turn_in,
      hhg_move,
      barracks_checkout,
      file_va_claim,
    } = req.body;
    const newUser = {
      first,
      last,
      email,
      rank,
      branch,
      duty_station,
      taps_complete,
      leave_start_date,
      ets_date,
      planning_to_relocate,
      city,
      state,
      has_dependents,
      highest_education,
      seeking_further_education,
      mos,
      interests,
      final_physical,
      gear_turn_in,
      hhg_move,
      barracks_checkout,
      file_va_claim,
    };
    try {
      // DONT FORGET TO ENCRYPT PASSWORD
      // newUser.password = await bcrypt.hash(password, 10);
      console.log('req.body', req.body)
      const user = (
        await sql`UPDATE users SET ${sql(
          newUser
        )} WHERE user_id = ${id} RETURNING *`
      )[0];
      res.send(user);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END UPDATE A CERTAIN USER INFORMATION *************/
  /************* DELETE A CERTAIN USER  *************/
  if (checkApiMethod(req, "DELETE")) {
    try {
      const user = (
        await sql`DELETE FROM users WHERE user_id = ${id} RETURNING *`
      )[0];
      res.json(user);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END DELETE A CERTAIN USER  *************/
  notFound404(res);
}
