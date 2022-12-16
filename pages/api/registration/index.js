import { application } from "express";
import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";
export default async function handler(req, res) {
  // const  {regCode}  = req.body;
  /************* GET A CERTAIN COHORT INFORMATION *************/
  if (checkApiMethod(req, "GET")) {
    try {
      const cohorts = await sql`SELECT * FROM cohorts`;
      res.json(cohorts);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }

}
