const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  
  const token = req.header('Authorization')?.replace('Bearer ', '');

 
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = authMiddleware;

