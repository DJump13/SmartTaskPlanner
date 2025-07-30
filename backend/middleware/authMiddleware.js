const jwt = require("jsonwebtoken");
const User = require("../models/User");

//protect routes using jwt token in auth header
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; //Bearer <token>
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token

    const user = await User.findById(decoded.id);
    if (!user) throw new Error("User not found");

    req.user = user; //add user id to request
    next(); //continue to next middleware or route
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
