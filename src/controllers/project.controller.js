import {
  createProjectService,
  getProjectsService,
  deleteProjectService
} from "../services/project.service.js";

export const createProject = async (req, res, next) => {
  try {
    const project = await createProjectService({
      name: req.body.name,
      organizationId: req.organizationId,
      userId: req.user.userId
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await getProjectsService(req.organizationId);
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await deleteProjectService({
      projectId: req.params.id,
      organizationId: req.organizationId
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
