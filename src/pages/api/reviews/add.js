import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { product_id, customer_email, customer_name, hide_name, rating, comment } = req.body;

    if (!product_id || !customer_email || !rating || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const result = await pool.query(
        `INSERT INTO reviews 
         (product_id, customer_email, customer_name, hide_name, rating, comment) 
         VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [product_id, customer_email, customer_name || "", hide_name || false, rating, comment]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error inserting review:", err);
      res.status(500).json({ error: "Failed to add review" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
