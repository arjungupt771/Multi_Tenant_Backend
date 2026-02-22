// src/middlewares/role.middleware.js
import { ROLE_PERMISSIONS } from "../constants/roles.js";

const permissionMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    const role = req.user.role;

    const permissions = ROLE_PERMISSIONS[role] || [];

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
};

export default permissionMiddleware;
