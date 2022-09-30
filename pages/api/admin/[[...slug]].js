import sql from "../../../database/connection";
import { checkApiMethod, notFound404 } from "../../../utility";
export default async function handler(req, res) {
  if (!req.query.slug) {
    /******** CREATE NEW ADMIN ********/
    if (checkApiMethod(req, "POST")) {
      const { first, last, email, username, password } = req.body;
      const newAdmin = { first, last, email, username, password };
      //   newAdmin.password = await bcrypt.hash(password, 10);

      try {
        const admin = await sql`INSERT INTO users ${sql(newAdmin)} RETURNING *`;
        res.json(admin);
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
      return;
    }
    /******** END CREATE NEW ADMIN ********/
  } else {
    const { slug } = req.query;
    /******** UPDATE ESXISTING ADMIN ********/
    if (
      checkApiMethod(req, "PATCH") &&
      typeof parseInt(req.query.slug[0]) === "number"
    ) {
      const { first, last, email, username, password } = req.body;
      const newAdmin = { first, last, email, username, password };

      try {
        const admin = await sql`UPDATE users SET ${sql(
          newAdmin
        )} WHERE user_id = ${slug[0]} RETURNING *`;

        res.json(admin);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
      return;
    }
    /******** END UPDATE ESXISTING ADMIN ********/

    /******** UPDATE ESXISTING STUDENT ********/
    if (
      checkApiMethod(req, "PATCH") &&
      slug[0] === "edit" &&
      typeof parseInt(req.query.slug[1]) === "number"
    ) {
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
      const newAdmin = {
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
        const student = (
          await sql`UPDATE users SER ${sql(newAdmin)} WHERE user_id = ${
            slug[1]
          } RETURNING *`
        )[0];
        res.json(student);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
      return;
    }
    /******** END UPDATE ESXISTING STUDENT ********/
  }
  notFound404(res);
}
