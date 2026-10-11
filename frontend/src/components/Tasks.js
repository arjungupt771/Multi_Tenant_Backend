
import React, { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import { FaPlus, FaCheck, FaUndo, FaClipboardList } from 'react-icons/fa';

const getPayload = response => response?.data?.data ?? response?.data;

const Tasks = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    setTasks([]);

    try {
      const response = await api.get(`/tasks/project/${projectId}`);
      const payload = getPayload(response);
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.tasks)
          ? payload.tasks
          : [];

      setTasks(list);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load tasks.');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      loadTasks();
    }
  }, [projectId, loadTasks]);

  const createTask = async event => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle || creating) return;

    setCreating(true);
    setError('');

    try {
      const response = await api.post('/tasks', {
        title: trimmedTitle,
        projectId,
      });

      const payload = getPayload(response);
      const task = payload?.task ?? payload;

      if (!task?._id) {
        throw new Error('The server returned an invalid task.');
      }

      setTasks(current => [...current, task]);
      setTitle('');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to create task.'
      );
    } finally {
      setCreating(false);
    }
  };

  const updateStatus = async task => {
    if (updatingId) return;

    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';

    setUpdatingId(task._id);
    setError('');

    try {
      const response = await api.patch(`/tasks/${task._id}/status`, {
        status: newStatus,
      });

      const payload = getPayload(response);
      const updatedTask = payload?.task ?? payload;

      if (!updatedTask?._id) {
        throw new Error('The server returned an invalid task.');
      }

      setTasks(current =>
        current.map(item =>
          item._id === task._id ? updatedTask : item
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update task.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="tasks mt-4">
      <div className="card p-3">
        <h3 className="mb-3 section-title">
          <FaClipboardList className="me-2" />
          Tasks
        </h3>

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

        <form onSubmit={createTask} className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="New task title"
            aria-label="New task title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            maxLength={200}
            required
          />

          <button
            className="btn btn-success"
            type="submit"
            disabled={creating || !title.trim()}
          >
            <FaPlus className="me-1" />
            {creating ? 'Adding...' : 'Add'}
          </button>
        </form>

        {loading ? (
          <div className="text-center py-3" role="status">
            <div className="spinner-border text-secondary">
              <span className="visually-hidden">Loading tasks...</span>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-muted py-3 mb-0">
            No tasks for this project yet.
          </p>
        ) : (
          <ul className="list-group">
            {tasks.map(task => (
              <li
                key={task._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span
                  className={
                    task.status === 'DONE' ? 'text-decoration-line-through text-muted' : ''
                  }
                >
                  {task.title}
                  <small className="d-block text-muted">
                    {task.status || 'TODO'}
                  </small>
                </span>

                <button
                  type="button"
                  className={`btn btn-sm ${
                    task.status === 'DONE' ? 'btn-warning' : 'btn-primary'
                  }`}
                  aria-label={
                    task.status === 'DONE'
                      ? `Reopen ${task.title}`
                      : `Complete ${task.title}`
                  }
                  disabled={updatingId !== null}
                  onClick={() => updateStatus(task)}
                >
                  {updatingId === task._id ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : task.status === 'DONE' ? (
                    <FaUndo />
                  ) : (
                    <FaCheck />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Tasks;
