import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  const { id } = req.query;
  /************* GET A CERTAIN USER INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const user = (await sql`SELECT * FROM users WHERE user_id = ${id}`)[0];
      res.json(user);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
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
    };
    try {
      // DONT FORGET TO ENCRYPT PASSWORD
      // newUser.password = await bcrypt.hash(password, 10);

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
  notFound404(res)
}

