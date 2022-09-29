import sql from "../../../database/connection"
export default async function handler(req, res) {
  switch(req.method){
    case 'GET':
        try {
            let data = await sql`SELECT * FROM cohorts ORDER BY cohort_id ASC;`
            res.json(data.rows)    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    break;
   }
  }
  