import { notFound404 } from "../../utility";
export default async function handler(req, res) {
  console.log(req.method,req.url);
  notFound404(res);
}
