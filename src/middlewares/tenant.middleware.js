// src/middlewares/tenant.middleware.js
const tenantMiddleware = (req, res, next) => {
  if (!req.user || !req.user.organizationId) {
    return res.status(403).json({
      message: "Tenant context missing"
    });
  }

  req.organizationId = req.user.organizationId;

  next();
};

export default tenantMiddleware;
