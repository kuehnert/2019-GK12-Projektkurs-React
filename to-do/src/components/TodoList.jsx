import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getTodos } from '../actions';

class TodoList extends Component {
  componentDidMount() {
    // TODO: Nur Laden wenn noch nicht vorhanden
    if (this.props.todos.list === null) {
      this.props.getTodos();
    }
  }

  renderTodos() {
    const { list } = this.props.todos;

    return (
      <ol>
        {list.map(todo => {
          return (
            <li key={todo.id}>
              <Link to={`/todos/${todo.id}`}>
                {todo.id} {todo.name}
              </Link>
            </li>
          );
        })}
      </ol>
    );
  }

  render() {
    console.log(this.props);

    const { list } = this.props.todos;

    if (list === null) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Liste der To-Dos</h1>
        {this.renderTodos()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  return { todos: state.todos };
};

const mapDispatchToProps = {
  getTodos: getTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
