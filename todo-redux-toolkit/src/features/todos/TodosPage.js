import React from 'react';
import { useSelector } from 'react-redux';

const TodosPage = () => {
  const todos = useSelector(state => state.todos.list);

  if (todos == null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Todos Page</h1>
      {todos}
    </div>
  );
};

export default TodosPage;
