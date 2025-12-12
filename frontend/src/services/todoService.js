const API_BASE_URL = 'http://localhost:3000/api';

/**
 * API Service for Todo operations
 * Centralizes all HTTP calls to backend
 */

/**
 * Get all todos from backend
 * @returns {Promise<Array>} List of todos
 */
export const getAllTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data; // Backend returns { success: true, data: [...] }
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

/**
 * Create new todo
 * @param {Object} todoData - { title, description }
 * @returns {Promise<Object>} Created todo
 */
export const createTodo = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      // Backend devuelve { success: false, error: "mensaje" }
      throw new Error(result.error || 'Failed to create todo');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

/**
 * Update existing todo
 * @param {string} id - Todo ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated todo
 */
export const updateTodo = async (id, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to update todo');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

/**
 * Delete todo
 * @param {string} id - Todo ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete todo');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
