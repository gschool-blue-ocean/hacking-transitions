import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL,{ idle_timeout: 60 });
export default sql;




















