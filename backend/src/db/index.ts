import { Pool } from "pg";

const db_host = process.env.DATABASE_HOST || "localhost";

export const pool = new Pool({
  user: "postgres",
  password: "password",
  host: db_host,
  port: 5432,
  database: "tasks_db",
});
