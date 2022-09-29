import sql from "../../../database/connection"
import { checkApiMethod } from "../../../utility"
export default async function handler(req, res) {
 if(checkApiMethod(req, "GET")) {
    try {
        let data = await sql`SELECT * FROM cohorts ORDER BY cohort_id ASC;`
        res.json(data.rows)    
    } catch (error) {
        console.log(error)
        res.send(error)
    }
} 
return
}
  