import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodo, updateTodo } from '../actions';
import history from '../history';

class TodoEditPage extends Component {
  state = { todoText: '' };

  async componentDidMount() {
    const id = Number.parseInt(this.props.match.params.id);

    await this.props.getTodo(id);
    // console.log( this.props.todo );
    this.setState({ todoText: this.props.todo.text });
  }

  onChange = event => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    this.setState({ todoText: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.updateTodo(this.props.todo.id, this.state.todoText);
    history.push('/');
  };

  render() {
    // console.log(this.props);

    if (this.props.todo == null) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>To-Do bearbeiten</h2>
        <form onSubmit={this.onSubmit}>
          Text:
          <input type="text" name="text" value={this.state.todoText} onChange={this.onChange} />
          <button type="submit">Speichern</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todos.selected,
  };
};

const mapDispatchToProps = {
  getTodo: getTodo, updateTodo: updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditPage);
