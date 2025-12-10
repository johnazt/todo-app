const todoData = require('../data/todoData');

/**
 * Get all todos
 * @returns {Array} List of all todos
 */
const getAllTodos = () => {
  const todos = todoData.getAllTodos();

  return todos.sort((a, b) => {
    new Date(b.createdAT) - new Date(a.createdAT);
  });
};

/**
 * Get todo by ID
 * @param {string} id - Todo ID
 * @returns {Object|null} Todo object or null if not found
 */
const getTodoById = (id) => {
  if (!id) {
    throw new Error('Todo ID is required');
  }

  const todo = todoData.getTodoById(id);

  if (!todo) {
    throw new Error(`Todo with ID ${id} not found`);
  }
  return todo;
};

/**
 * Create new todo
 * @param {Object} todoInput - Todo data
 * @returns {Object} Created todo
 */
const createTodo = (todoInput) => {
  if (!todoInput.title || todoInput.title.trim().length === 0) {
    throw new Error('Title is required');
  }

  if (todoInput.title.length > 100) {
    throw new Error('Title must be less than 100 characters');
  }

  //Business logic: Create todo object with defaults
  const newTodo = {
    id: generateId(),
    title: todoInput.title.trim(),
    description: todoInput.description?.trim() || '',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  return todoData.saveTodo(newTodo);
};

/**
 * Update existing todo
 * @param {string} id - Todo ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated todo
 */
const updateTodo = (id, updates) => {
  if (!id) {
    throw new Error('Todo ID is required');
  }

  const existingTodo = todoData.getTodoById(id);
  if (!existingTodo) {
    throw new Error(`Todo with ID ${id} not found`);
  }

  if (updates.title !== undefined) {
    if (updates.title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }

    if (updates.title.length > 100) {
      throw new Error('Title must be less than 100 characters');
    }
    updates.title = updates.title.trim();
  }

  if (updates.description !== undefined) {
    updates.description = updates.description.trim();
  }

  updates.updatedAt = new Date().toISOString();

  return todoData.updateTodo(id, updates);
};

/**
 * Delete todo
 * @param {string} id - Todo ID
 * @returns {boolean} Success status
 */
const deleteTodo = (id) => {
  if (!id) {
    throw new Error('Todo ID is required');
  }
  const deleted = todoData.deleteTodo(id);

  if (!deleted) {
    throw new Error(`Todo with ID ${id} not found`);
  }
  return true;
};

/**
 * Generate unique ID (simple implementation)
 * In production, use uuid library
 */
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
