import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PostPage extends Component {
  state = { post: null };

  async componentDidMount() {
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`
    );

    this.setState({ post: result.data });
  }

  render() {
    if (this.state.post === null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{this.state.post.title}</div>
          <div className="meta">Blog Eintrag</div>
          <div className="description">
            {this.state.post.body}
            <br/>
            <Link to="/">Zurück zur Liste</Link>
          </div>
        </div>
      </div>
    );
  }
}
