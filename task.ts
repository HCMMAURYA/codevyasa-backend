// src/tasks.ts
import { FastifyInstance } from 'fastify';
import db from './db';

// Define the task schema
interface Task {
  id: number;
  title: string;
  description: string;
}

// Create a route for getting all tasks
const getAllTasks = async (fastify: FastifyInstance) => {
  try {
    const { rows } = await db.query<Task>('SELECT * FROM tasks');
    return rows;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};

// Create a route for getting a task by ID
const getTaskById = async (fastify: FastifyInstance) => {
  const { id } = fastify.params as { id: string };
  try {
    const { rows } = await db.query<Task>('SELECT * FROM tasks WHERE id = $1', [id]);
    if (rows.length === 0) {
      throw new Error('Task not found');
    }
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching task by ID');
  }
};

// Create a route for creating a task
const createTask = async (fastify: FastifyInstance) => {
  const { title, description } = fastify.body as Task;
  try {
    const { rows } = await db.query<Task>('INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *', [
      title,
      description,
    ]);
    return rows[0];
  } catch (error) {
    throw new Error('Error creating task');
  }
};

// Create a route for updating a task
const updateTask = async (fastify: FastifyInstance) => {
  const { id } = fastify.params as { id: string };
  const { title, description } = fastify.body as Task;
  try {
    const { rows } = await db.query<Task>(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    if (rows.length === 0) {
      throw new Error('Task not found');
    }
    return rows[0];
  } catch (error) {
    throw new Error('Error updating task');
  }
};

// Create a route for deleting a task
const deleteTask = async (fastify: FastifyInstance) => {
  const { id } = fastify.params as { id: string };
  try {
    const { rows } = await db.query<Task>('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      throw new Error('Task not found');
    }
    return rows[0];
  } catch (error) {
    throw new Error('Error deleting task');
  }
};

export default async function tasksRoutes(fastify: FastifyInstance) {
  fastify.get('/tasks', getAllTasks);
  fastify.get('/tasks/:id', getTaskById);
  fastify.post('/tasks', createTask);
  fastify.put('/tasks/:id', updateTask);
  fastify.delete('/tasks/:id', deleteTask);
}
