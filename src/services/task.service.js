
import { Task } from "../models/task.model.js";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

export const createTaskService = async ({
  title,
  projectId,
  assignedTo,
  organizationId
}) => {
  // Validate that the project belongs to this organization.
  const project = await Project.findOne({
    _id: projectId,
    organizationId
  }).select("_id");

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  // Prevent assigning a task to a user in another organization.
  if (assignedTo) {
    const assignee = await User.findOne({
      _id: assignedTo,
      organizationId
    }).select("_id");

    if (!assignee) {
      const error = new Error(
        "Assignee not found in this organization"
      );
      error.statusCode = 400;
      throw error;
    }
  }

  return Task.create({
    title,
    projectId: project._id,
    assignedTo: assignedTo || undefined,
    organizationId
  });
};

export const getTasksByProjectService = async ({
  projectId,
  organizationId
}) => {
  // Verify tenant ownership before listing project tasks.
  const project = await Project.findOne({
    _id: projectId,
    organizationId
  }).select("_id");

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return Task.find({
    projectId: project._id,
    organizationId
  });
};

export const updateTaskStatusService = async ({
  taskId,
  status,
  organizationId
}) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      organizationId
    },
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};
