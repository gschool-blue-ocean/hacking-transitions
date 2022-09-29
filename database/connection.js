<<<<<<< HEAD
import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL);
export default sql;
=======
import {Pool} from 'pg'
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
export default pool




















>>>>>>> 6f19e8c (initial commit)
