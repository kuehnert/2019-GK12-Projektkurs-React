import React, { Component } from 'react';
import axios from 'axios';

import Post from './Post'

export default class PostList extends Component {
  constructor(props) {
    super(props);
    console.log("Constructor");

    this.state = { posts: null };
  }

  async componentDidMount() {
    console.log("componentDidMount");
    console.log(this.state);

    if (this.state.posts === null) {
      const result = await axios.get('https://jsonplaceholder.typicode.com/posts');

      this.setState({posts: result.data});
    }
  }

  renderPosts() {
    return (
      this.state.posts.map(post => (
        <Post key={post.id} post={post} />
      ))
    );
  }

  render() {
    if (this.state.posts === null) {
      return <div>Keine Blogeinträge vorhanden.</div>
    }

    return (
      <div className="ui cards">
        {this.renderPosts()}
      </div>
    );
  }
}
