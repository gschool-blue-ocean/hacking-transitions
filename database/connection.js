import postgres from "postgres";
const config = require('./dataConnectionConfig')[process.env.NODE_ENV||"dev"]
const CONNECTION_STRING = config.connectionString
//process.env.CONNECTION_STRING = CONNECTION_STRING

console.log("log Connection String:", CONNECTION_STRING)

const sql = postgres(process.env.CONNECTION_STRING,{ idle_timeout: 1000 });

export default sql;




















