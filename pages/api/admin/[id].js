// import sql from "../../../database/connection"
// import { checkApiMethod } from "../../../utility"
// export default async function handler(req, res) {
//  if (checkApiMethod(req, "PATCH")) {
//     const user_id = req.query.id;
//     const { first, last, email, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, mos, interests } = req.body
//     const updateAdmin = { first, last, email, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, mos, interests}
//     try {
//         let data = await sql`UPDATE users SET ${sql(newAdmin)} WHERE user_id = ${user_id} RETURNING *`
//         res.json(data)
//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
//  } else if (checkApiMethod(req, 'POST')) {
//     const { first, last, email, username, password } = req.body;
//     const newAdmin = { first, last, email, username, password };
//     try {
//         let data = await sql`INSERT INTO users (first, last, email, username, password, admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;'`, [first, last, email, username, hashedPassword, true])
//         res.json(data.rows)
//         client.release()

//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
//  }
// }
  