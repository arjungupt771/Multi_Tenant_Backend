import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || typeof token !== "string" || !token.trim()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);

    if (!decoded || typeof decoded !== "object") {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    const message =
      error && error.name === "TokenExpiredError"
        ? "Token expired"
        : "Invalid token";

    return res.status(401).json({ message });
  }
};

export default authMiddleware;