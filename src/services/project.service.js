// src/services/project.service.js
import {Project} from "../models/project.model.js";

export const createProjectService = async ({
  name,
  organizationId,
  userId
}) => {
  return Project.create({
    name,
    organizationId,
    createdBy: userId
  });
};

export const getProjectsService = async (organizationId) => {
  return Project.find({ organizationId });
};

export const deleteProjectService = async ({
  projectId,
  organizationId
}) => {
  if (!projectId) {
    const error = new Error("Project ID is required");
    error.statusCode = 400;
    throw error;
  }

  const project = await Project.findOneAndDelete({
    _id: projectId,
    organizationId
  });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};
