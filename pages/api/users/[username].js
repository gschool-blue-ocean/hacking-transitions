import sql from "../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../utility";

if (checkApiMethod(req, "GET")) {
    try {
      const user = (await sql`SELECT * FROM users WHERE username = ${username}`)[0];
      res.json(user);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }