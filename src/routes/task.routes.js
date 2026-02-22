import express from "express";
import auth from "../middlewares/auth.middleware.js";
import tenant from "../middlewares/tenant.middleware.js";
import {
  createTask,
  getTasksByProject,
  updateTaskStatus
} from "../controllers/task.controller.js";
import { PERMISSIONS } from "../constants/permissions.js";
import permissionMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(auth, tenant);

router.post("/", permissionMiddleware(PERMISSIONS.TASK_CREATE), createTask);
router.get("/project/:projectId", getTasksByProject);
router.patch("/:id/status", permissionMiddleware(PERMISSIONS.TASK_UPDATE_STATUS), updateTaskStatus);

export default router;
