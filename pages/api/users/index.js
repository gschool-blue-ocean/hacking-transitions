import sql from "../../../database/connection";
import { checkApiMethod,  notFound404, handleErrors } from "../../../utility";

export default async function handler(req, res) {
  console.log(req.method,req.url);
  /************* GET ALL USERS INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const users = await sql`SELECT * FROM users ORDER BY user_id ASC;`;
      res.send(users);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET ALL USERS INFORMATION *************/


  /************* CREATE A NEW USER  *************/
  if (checkApiMethod(req, "POST")) {
    const {
      first,
      last,
      email,
      username,
      password,
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
      admin,
      cohort_name,
      cohort_id,
      new_user,
      mos,
      interests,
    } = req.body;
    // DONT FORGET TO ENCRYPT PASSWORD BEFORE SENDING
    const newUser = {
      first,
      last,
      email,
      username,
      password,
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
      admin,
      cohort_name,
      cohort_id,
      new_user,
      mos,
      interests,
    };
    try {
      // newUser.password = await bcrypt.hash(password, 10);
      const user = (
        await sql`INSERT INTO users ${sql(newUser)} RETURINING *`
      )[0];
      res.json(user);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END CREATE A NEW USER  *************/
  notFound404(res);
}
