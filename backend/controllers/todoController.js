const todoService = require('../services/todoServices');

/**
 * Get all todos
 */
const getAllTodos = async (req, res) => {
  try {
    const todos = todoService.getAllTodos();

    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve todos',
    });
  }
};

/**
 * Get todo by ID
 */
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = todoService.getTodoById(id);

    return res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve todo',
    });
  }
};

/**
 * Create new todo
 */
const createTodo = async (req, res) => {
  try {
    const todoInput = req.body;
    const newTodo = todoService.createTodo(todoInput);

    return res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    if (
      error.message.includes('required') ||
      error.message.includes('must be')
    ) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to create todo',
    });
  }
};

/**
 * Update existing todo
 */
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTodo = todoService.updateTodo(id, updates);

    return res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    if (
      error.message.includes('required') ||
      error.message.includes('cannot be')
    ) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to update todo',
    });
  }
};

/**
 * Delete todo
 */
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    todoService.deleteTodo(id);
    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to delete todo',
    });
  }
};

module.exports = {
   getAllTodos, 
   getTodoById,
   createTodo, 
   updateTodo, 
   deleteTodo
}
