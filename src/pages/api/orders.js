// src/pages/api/orders.js
import { query } from "./db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // create customer (or find)
      const { customer, items, subtotal, shipping = 0, tax = 0, payment_method } = req.body;
      // Upsert customer by email
      const { email } = customer;
      const cRes = await query("SELECT * FROM customers WHERE email = $1", [email]);
      let customerId;
      if (cRes.rowCount === 0) {
        const ins = await query(
          `INSERT INTO customers (email, name, phone, house, street, city, province, postal_code, landmark, comments, payment_status)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
          [email, customer.name, customer.phone, customer.house, customer.street, customer.city, customer.province, customer.postal_code, customer.landmark, customer.comments, 'pending']
        );
        customerId = ins.rows[0].id;
      } else {
        customerId = cRes.rows[0].id;
      }

      const total = Number(subtotal) + Number(shipping) + Number(tax);
      const order = await query(
        `INSERT INTO orders (customer_id, order_items, subtotal, shipping, tax, total, payment_method, payment_status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [customerId, JSON.stringify(items), subtotal, shipping, tax, total, payment_method, 'pending']
      );

      return res.status(201).json(order.rows[0]);
    }

    if (req.method === "PUT") {
      // update order status / add tracking update
      const { id, action, payload } = req.body;
      // action: update_status, add_tracking
      if (action === "update_status") {
        const r = await query("UPDATE orders SET tracking_status=$1, updated_at=now() WHERE id=$2 RETURNING *", [payload.status, id]);
        return res.status(200).json(r.rows[0]);
      }
      if (action === "add_tracking") {
        const o = await query("SELECT tracking_updates FROM orders WHERE id=$1", [id]);
        const updates = o.rows[0].tracking_updates || [];
        updates.push({ status: payload.status, note: payload.note || "", timestamp: new Date().toISOString() });
        const r = await query("UPDATE orders SET tracking_updates=$1, updated_at=now() WHERE id=$2 RETURNING *", [JSON.stringify(updates), id]);
        return res.status(200).json(r.rows[0]);
      }
    }

    if (req.method === "GET") {
      // list orders
      const r = await query("SELECT o.*, c.email, c.name as customer_name FROM orders o LEFT JOIN customers c ON c.id = o.customer_id ORDER BY o.created_at DESC", []);
      return res.status(200).json(r.rows);
    }

    return res.status(405).end();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
