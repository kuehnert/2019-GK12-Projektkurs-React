import React from 'react';
import history from '../history';

const Todo = ({ onClick, completed, text, id }) => (
  <li>
    <span
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}>
      {text}{' '}
    </span>

    <button onClick={() => history.push(`/todos/${id}`)}>Bearbeiten</button>
  </li>
);

export default Todo;
