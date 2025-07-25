const jwt = require("jsonwebtoken");

//protect routes using jwt token in auth header
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //Bearer <token>
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
    req.user = decoded.id; //add user id to request
    next(); //continue to next middleware or route
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
