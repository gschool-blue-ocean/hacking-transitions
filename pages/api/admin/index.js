import sql from "../../../database/connection"

export default async function handler(req, res) {
  const { slug } = req.query;
  switch (req.method) {
    case "GET":
        try {
        // let data = await client.query('SELECT * FROM users ORDER BY user_id ASC;')
        let data = await sql`SELECT * FROM users ORDER BY user_id ASC;`
        res.send(data.rows);
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      break;
    default:
      break;
  }
}
