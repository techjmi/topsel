const jwt = require("jsonwebtoken");
const Topsel_User = require("../model/user-model");
// const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    // extract token from the authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    //  Decode , verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  get user ID from the decoded token
    req.userId = decoded._id;

    // Find user in database
    const user = await Topsel_User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    //Attach user and token to the request object
    req.user = user;
    req.token = token;

    // Move to next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
