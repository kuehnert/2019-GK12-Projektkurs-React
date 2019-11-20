import React from 'react'
import { Link } from 'react-router-dom'

export default function Post(props) {
  return (
    <li>
      <Link to={`/posts/${props.post.id}`}>{props.post.title}</Link>
      {props.post.id}
      {props.post.body}
    </li>
  )
}
