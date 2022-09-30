import sql from "../../../database/connection";
import { checkApiMethod } from "../../../utility";
export default async function handler(req, res) {
  if (checkApiMethod(req, "PATCH")) {
    const user_id = req.query.id;
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
      const user = (await sql`UPDATE users SET ${sql(
        newUser
      )} WHERE user_id = ${user_id} RETURNING *`)[0];
      res.send(user);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

