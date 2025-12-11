const todos = [
  {
    id: '1',
    title: 'Learn Node.js',
    description: 'Understand Express and REST APIs',
    completed: false,
    createdAT: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Build Todo App',
    description: 'Implement fullstack architecture',
    completed: false,
    createdAT: new Date().toISOString(),
  },
];

const getAllTodos = () => {
  return [...todos];
};

const getTodoById = (id) => {
  return todos.find((todo) => todo.id === id);
};

const saveTodo = (todo) => {
  todos.push(todo);
  return todo;
};

const updateTodo = (id, updates) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;

  todos[index] = { ...todos[index], ...updates };
  return todos[index];
};

const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
};

module.exports = {
  getAllTodos,
  getTodoById,
  saveTodo,
  updateTodo,
  deleteTodo,
};
