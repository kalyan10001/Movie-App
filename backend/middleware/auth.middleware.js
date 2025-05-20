import jwt from "jsonwebtoken";

export const VerifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("⛔ No or invalid auth header");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);
    req.user = decoded; // Make sure this line exists!
    next();
  } catch (err) {
    console.error("⛔ Token error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};



export const VerifyAdmin = (req, res, next) => {
  console.log("🔐 Checking Admin Role: ", req.user);

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next();
};
