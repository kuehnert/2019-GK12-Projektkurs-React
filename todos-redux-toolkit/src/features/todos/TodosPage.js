import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos } from './todoSlice';

const TodosPage = () => {
  const todos = useSelector(state => state.todos.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (todos == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todos Page</h1>!
      {JSON.stringify(todos)}!
    </div>
  );
};

export default TodosPage;
