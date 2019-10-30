import React from 'react'

export default function Post(props) {
  return (
    <li>
      {props.post.title}
      {props.post.id}
      {props.post.body}
    </li>
  )
}
