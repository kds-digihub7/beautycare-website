// pages/api/admin/login.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Simple admin validation (in production, use proper authentication)
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = jwt.sign(
        { 
          email: email, 
          admin: true,
          id: 1 
        }, 
        process.env.JWT_SECRET || 'fallback-secret-change-in-production', 
        { expiresIn: '24h' }
      );

      // Set HTTP-only cookie
      res.setHeader('Set-Cookie', [
        `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      ]);
      
      return res.status(200).json({ 
        email: email,
        message: 'Login successful'
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}