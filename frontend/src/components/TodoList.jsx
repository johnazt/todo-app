import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div className="empty">No todos yet. Create your first one!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
