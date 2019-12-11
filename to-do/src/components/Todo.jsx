import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTodo, getTodos } from '../actions';

class Todo extends Component {
  async componentDidMount() {
    if (this.props.todos.list === null) {
      await this.props.getTodos();
    }

    // Hier wird die Action ausgelöst,
    // die das To-Do lädt
    const { id } = this.props.match.params;
    this.props.getTodo(id);
  }

  render() {
    const { todo } = this.props.todos;

    if (todo === null) {
      return <div>Loading...</div>;
    }

    console.log(todo);

    return (
      <div>
        <h1>Ein einfaches Todo</h1>
        <p>{todo.name}</p>
        <p>{todo.done ? "fertig" : "muss noch"}</p>

        <Link to={`/`}>Zurück zur Liste</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = {
  getTodo: getTodo,
  getTodos: getTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
