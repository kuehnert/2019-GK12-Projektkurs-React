import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTodos } from '../actions';

class TodoList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    console.log(this.props);

    return <div>Liste der To-Dos</div>;
  }
}

const mapStateToProps = state => {
  return { todos: state.todos };
};

const mapDispatchToProps = {
  getTodos: getTodos,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
