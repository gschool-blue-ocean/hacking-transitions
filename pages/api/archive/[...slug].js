import sql from "../../../database/connection";
import { checkApiMethod, notFound404 } from "../../../utility";

export default async function handler(req, res) {
const {slug} = req.query

  notFound404(res);
}
