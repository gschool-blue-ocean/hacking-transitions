import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors } from "../../../../utility";

export default async function handler(req, res) {
  console.log(req.method, req.url);
  const { id } = req.query;

  if (checkApiMethod(req, "GET")) {
    try {
      const user = (
        await sql`SELECT * FROM users WHERE ${sql`last = ${id}`}`
      )[0];

      user ? res.json(user) : res.status(404).send("Not Found");
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  } else notFound404(res);
}
