import React from 'react';
import { Link } from 'react-router-dom';

export default function Post(props) {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">
          <Link to={`/posts/${props.post.id}`}>{props.post.title}</Link>
        </div>
      </div>
    </div>
  );
}
