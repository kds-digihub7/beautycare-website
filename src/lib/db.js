import pool from "@/lib/db";

export default async function handler(req, res) {
  try {
    // sab products fetch karo
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    const products = result.rows;

    // Top-selling filter (dummy: sabse zyada price wale top-selling maan liye)
    const topSelling = [...products].sort((a, b) => b.price - a.price).slice(0, 3);

    // New arrivals (latest 3 products)
    const newProducts = products.slice(0, 3);

    res.status(200).json({ products, topSelling, newProducts });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
