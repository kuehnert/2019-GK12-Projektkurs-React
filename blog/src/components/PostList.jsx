import React, { Component } from 'react';
import Post from './Post'
export default class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        title: 'Hello, World!',
        body: 'Heute ist ein guter Tag.',
      },
      {
        id: 2,
        title: 'Hallo, Gestern!',
        body: 'Gestern war auch ein guter Tag!',
      },
    ],
  };

  componentDidMount() {}

  renderPosts() {
    return (
      this.state.posts.map(post => (
        <Post key={post.id} post={post} />
      ))
    );
  }

  render() {
    return (
      <ol>
        {this.renderPosts()}
      </ol>
    );
  }
}
