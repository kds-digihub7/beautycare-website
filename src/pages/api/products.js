// pages/api/products.js
import { query } from "./db";
import jwt from "jsonwebtoken";

function requireAdmin(req) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;
    if (!token) throw new Error("No token provided");
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.admin) throw new Error("Not an admin");
    return decoded;
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const { id } = req.query;
      
      if (id) {
        // Get single product
        const result = await query("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: "Product not found" });
        }
        
        // Parse JSON fields
        const product = result.rows[0];
        if (product.images && typeof product.images === 'string') {
          product.images = JSON.parse(product.images);
        }
        if (product.colours && typeof product.colours === 'string') {
          product.colours = JSON.parse(product.colours);
        }
        if (product.variants && typeof product.variants === 'string') {
          product.variants = JSON.parse(product.variants);
        }
        
        return res.status(200).json(product);
      } else {
        // Get all products
        const result = await query("SELECT * FROM products ORDER BY created_at DESC", []);
        
        // Parse JSON fields for each product
        const products = result.rows.map(product => {
          if (product.images && typeof product.images === 'string') {
            try {
              product.images = JSON.parse(product.images);
            } catch (e) {
              product.images = [];
            }
          }
          return product;
        });
        
        return res.status(200).json(products);
      }
    }

    if (req.method === "POST") {
      // Check admin authentication
      requireAdmin(req);

      const {
        name, description, price, discounted_price, stock_left,
        colours, variants, company_name, packing_price, shipping_price,
        tax, images, video
      } = req.body;

      // Validate required fields
      if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
      }

      const result = await query(
        `INSERT INTO products 
         (name, description, price, discounted_price, stock_left, colours, variants, company_name, packing_price, shipping_price, tax, images, video)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
         RETURNING *`,
        [
          name, 
          description || null, 
          parseFloat(price),
          discounted_price ? parseFloat(discounted_price) : null,
          stock_left ? parseInt(stock_left) : 0,
          colours ? JSON.stringify(colours) : null,
          variants ? JSON.stringify(variants) : null,
          company_name || null,
          packing_price ? parseFloat(packing_price) : 0,
          shipping_price ? parseFloat(shipping_price) : 0,
          tax ? parseFloat(tax) : 0,
          images ? JSON.stringify(images) : null,
          video || null
        ]
      );

      return res.status(201).json(result.rows[0]);
    }

    if (req.method === "PUT") {
      requireAdmin(req);
      const { id, ...fields } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const allowedFields = ['name', 'description', 'price', 'discounted_price', 'stock_left', 'colours', 'variants', 'company_name', 'packing_price', 'shipping_price', 'tax', 'images', 'video'];
      const sets = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(fields)) {
        if (allowedFields.includes(key)) {
          sets.push(`${key} = $${paramCount}`);
          
          // Handle JSON fields
          if (['colours', 'variants', 'images'].includes(key) && value) {
            values.push(JSON.stringify(value));
          } else {
            values.push(value);
          }
          paramCount++;
        }
      }

      if (sets.length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
      }

      values.push(id);
      const queryText = `UPDATE products SET ${sets.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`;
      
      const result = await query(queryText, values);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      requireAdmin(req);
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const result = await query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ success: true, deleted: result.rows[0] });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Products API error:", error);
    
    if (error.message.includes("Authentication")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

