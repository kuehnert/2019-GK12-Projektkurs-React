import React from 'react'
import { Link } from 'react-router-dom'

export default function PostPage(props) {
  return (
    <div>
      Hallo, ich bin ein Post mit der ID {props.match.params.id}.

      <Link to="/">Zurück zur Liste</Link>
    </div>
  )
}
