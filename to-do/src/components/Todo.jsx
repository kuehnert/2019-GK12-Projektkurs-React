import React, { Component } from 'react';
import { connect } from 'react-redux';

class Todo extends Component {
  componentDidMount() {
    // Hier wird die Action ausgelöst,
    // die das To-Do lädt
    const { id } = this.props.match.params;
    console.log('Lade Todo mit ID ' + id);
  }

  render() {
    if (this.props.todo === null) {
      return <div>Loading...</div>;
    }

    return <div>Ein einfaches Todo</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.todo
  }
}

export default connect(mapStateToProps)(Todo);
