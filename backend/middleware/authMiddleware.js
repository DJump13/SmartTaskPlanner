const jwt = require("jsonwebtoken");
const User = require("../models/User");

//protect routes using jwt token in auth header
const auth = async (req, res, next) => {
  try {
    const rawHeader = req.headers.authorization;
    const token = rawHeader?.startsWith("Bearer ")
      ? rawHeader.split(" ")[1]
      : rawHeader; //Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }

    req.user = user; //add user id to request
    next(); //continue to next middleware or route
  } catch (error) {
    console.log("Auth error: ", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
