import React, { Component } from 'react';
import axios from 'axios';

import Post from './Post'

export default class PostList extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const result = await axios.get('https://jsonplaceholder.typicode.com/posts');

    this.setState({posts: result.data});
  }

  renderPosts() {
    return (
      this.state.posts.map(post => (
        <Post key={post.id} post={post} />
      ))
    );
  }

  render() {
    if (this.state.posts.length === 0) {
      return <div>Keine Blogeinträge vorhanden.</div>
    }

    return (
      <ol>
        {this.renderPosts()}
      </ol>
    );
  }
}
