import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  
  if (!req.query.slug) {
    /******** CREATE NEW ADMIN ********/
    if (checkApiMethod(req, "POST")) {
      const { admin, first, last, email, username, cohort_name, cohort_id } = req.body;
      const newAdmin = { admin, first, last, email, username, cohort_name, cohort_id };

      try {
        const admin = await sql`INSERT INTO users ${sql(newAdmin)} RETURNING *`;
        res.json(admin);
      } catch (error) {
        console.log(error);
        handleErrors(res);
      }
      return;
    }
    if (checkApiMethod(req, "GET")) {
      try {
        const adminList = await sql`SELECT * FROM users WHERE admin=true`;
        res.json(adminList);
      } catch (error) {
        console.log(error);
        handleErrors(res);
      }
      return;
    }

    /******** END CREATE NEW ADMIN ********/
  } else {
    const { slug } = req.query;
    console.log(slug);

    /******** UPDATE EXISTING ADMIN ********/
    if (checkApiMethod(req, "PATCH") && !isNaN(parseInt(req.query.slug[0]))) {
      const { first, last, username } = req.body;
      const newAdmin = { first, last, username };

      try {
        const admin = await sql`UPDATE users SET ${sql(
          newAdmin
        )} WHERE user_id = ${slug[0]} RETURNING *`;

        res.json(admin);
      } catch (error) {
        console.log(error);
        handleErrors(res);
      }
      return;
    }
    /******** END UPDATE EXISTING ADMIN ********/

    /******** UPDATE EXISTING STUDENT ********/
    if (
      checkApiMethod(req, "PATCH") &&
      slug[0] === "edit" &&
      !isNaN(parseInt(req.query.slug[1]))
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
      const newStudent = {
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
          await sql`UPDATE users SET ${sql(newStudent)} WHERE user_id = ${
            slug[1]
          } RETURNING *`
        )[0];
        res.json(student);
      } catch (error) {
        console.log(error);
        handleErrors(res);
      }
      return;
    }
    /******** END UPDATE ESXISTING STUDENT ********/
  }
  notFound404(res);
}