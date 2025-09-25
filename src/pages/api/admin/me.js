// pages/api/admin/me.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-change-in-production');
    
    if (!decoded.admin) {
      return res.status(401).json({ error: 'Not an admin' });
    }

    return res.status(200).json({
      email: decoded.email,
      admin: true
    });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}