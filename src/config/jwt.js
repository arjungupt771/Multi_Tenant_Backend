// src/config/jwt.js
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: "7d"
};
