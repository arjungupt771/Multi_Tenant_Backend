import {
  createTaskService,
  getTasksByProjectService,
  updateTaskStatusService
} from "../services/task.service.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService({
      title: req.body.title,
      projectId: req.body.projectId,
      assignedTo: req.body.assignedTo,
      organizationId: req.organizationId
    });

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const getTasksByProject = async (req, res, next) => {
  try {
    const tasks = await getTasksByProjectService({
      projectId: req.params.projectId,
      organizationId: req.organizationId
    });

    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await updateTaskStatusService({
      taskId: req.params.id,
      status: req.body.status,
      organizationId: req.organizationId
    });

    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};
