import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';
import * as todoService from './services/todoService';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';

function App() {
  // State management
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  /**
   * Fetch todos on component mount
   */
  useEffect(() => {
    loadTodos();
  }, []);

  /**
   * Load all todos from backend
   */
  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle todo completed status
   * @param {string} id - Todo ID
   */
  const handleToggle = async (id) => {
    try {
      // Optimistic update - actualiza UI primero
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      // Find current todo to get its completed state
      const currentTodo = todos.find((t) => t.id === id);
      await todoService.updateTodo(id, { completed: !currentTodo.completed });
    } catch (err) {
      setError(err.message);
      // Si falla, recargar para revertir cambio optimista
      loadTodos();
    }
  };

  /**
   * Delete todo
   * @param {string} id - Todo ID
   */
  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      // Remove from state after successful deletion
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreate = async (todoData) => {
    try {
      await todoService.createTodo(todoData);
      loadTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
        <p>Fullstack Architecture with React + Express</p>
      </header>

      <main>
        <TodoForm onCreate={handleCreate} />
        <FilterBar filter={filter} onFilterChange={handleFilterChange} />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;
