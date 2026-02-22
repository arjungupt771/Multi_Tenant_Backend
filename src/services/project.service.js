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
  const project = await Project.findOneAndDelete({
    _id: projectId,
    organizationId
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};
