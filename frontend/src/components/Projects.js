
import React, { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import Tasks from './Tasks';
import { FaTrash, FaPlus, FaFolderOpen } from 'react-icons/fa';

const getPayload = response => response?.data?.data ?? response?.data;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/projects');
      const payload = getPayload(response);
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.projects)
          ? payload.projects
          : [];

      setProjects(list);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const createProject = async event => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName || creating) return;

    setCreating(true);
    setError('');

    try {
      const response = await api.post('/projects', {
        name: trimmedName,
      });

      const payload = getPayload(response);
      const project = payload?.project ?? payload;

      if (!project?._id) {
        throw new Error('The server returned an invalid project.');
      }

      setProjects(current => [...current, project]);
      setName('');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to create project.'
      );
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async id => {
    if (deletingId) return;

    setDeletingId(id);
    setError('');

    try {
      await api.delete(`/projects/${id}`);

      setProjects(current => current.filter(project => project._id !== id));
      setSelected(current => (current === id ? null : current));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="container mt-4">
      <section className="card p-3">
        <h2 className="mb-3 section-title">
          <FaFolderOpen className="me-2" />
          Projects
        </h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Dismiss error"
              onClick={() => setError('')}
            />
          </div>
        )}

        <form onSubmit={createProject} className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="New project name"
            aria-label="New project name"
            value={name}
            onChange={event => setName(event.target.value)}
            maxLength={100}
            required
          />

          <button
            className="btn btn-success"
            type="submit"
            disabled={creating || !name.trim()}
          >
            <FaPlus className="me-1" />
            {creating ? 'Creating...' : 'Add'}
          </button>
        </form>

        {loading ? (
          <div className="text-center py-4" role="status">
            <div className="spinner-border text-primary">
              <span className="visually-hidden">Loading projects...</span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted py-4">
            <FaFolderOpen size={28} className="mb-2" />
            <p className="mb-1">No projects yet.</p>
            <small>Create a project to get started.</small>
          </div>
        ) : (
          <ul className="list-group">
            {projects.map(project => (
              <li
                key={project._id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selected === project._id ? 'active' : ''
                }`}
              >
                <button
                  type="button"
                  className="btn text-start flex-grow-1"
                  style={{
                    color: selected === project._id ? 'white' : 'inherit',
                  }}
                  onClick={() => setSelected(project._id)}
                >
                  {project.name}
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  aria-label={`Delete ${project.name}`}
                  title={`Delete ${project.name}`}
                  disabled={deletingId !== null}
                  onClick={() => deleteProject(project._id)}
                >
                  {deletingId === project._id ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {selected && (
          <Tasks key={selected} projectId={selected} />
        )}
      </section>
    </main>
  );
};

export default Projects;
