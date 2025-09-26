import pool from "@/lib/db";

export default async function handler(req, res) {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT * FROM reviews WHERE product_id=$1 ORDER BY created_at DESC",
        [productId]
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
