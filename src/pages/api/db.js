// src/pages/api/db.js
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For Neon, ensure SSL is used in Vercel — Neon handles that.
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

export default pool;
