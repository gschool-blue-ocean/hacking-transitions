import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { idle_timeout: 1000 });

export default sql;
