// src/lib/db.js
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 🔹 env me rakho
  ssl: {
    rejectUnauthorized: false, // railway/heroku etc ke liye
  },
});

export default pool;
