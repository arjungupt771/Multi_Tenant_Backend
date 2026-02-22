// src/services/task.service.js
import {Task} from "../models/task.model.js";

export const createTaskService = async ({
  title,
  projectId,
  assignedTo,
  organizationId
}) => {
  return Task.create({
    title,
    projectId,
    assignedTo,
    organizationId
  });
};

export const getTasksByProjectService = async ({
  projectId,
  organizationId
}) => {
  return Task.find({
    projectId,
    organizationId
  });
};

export const updateTaskStatusService = async ({
  taskId,
  status,
  organizationId
}) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, organizationId },
    { status },
    { new: true }
  );

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};
