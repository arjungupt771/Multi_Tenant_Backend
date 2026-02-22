import express from "express";
import auth from "../middlewares/auth.middleware.js";
import tenant from "../middlewares/tenant.middleware.js";
import {
  createProject,
  getProjects,
  deleteProject
} from "../controllers/project.controller.js";
import { PERMISSIONS } from "../constants/permissions.js";
import permissionMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(auth, tenant);

router.post("/", permissionMiddleware(PERMISSIONS.PROJECT_CREATE), createProject);
router.get("/", getProjects);
router.delete("/:id", permissionMiddleware(PERMISSIONS.PROJECT_DELETE), deleteProject);

export default router;
