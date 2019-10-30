import React from "react"

export default function Game(props) {
  return (
    <div className="GameKarte">
      <div className="Title">Hello {props.player}</div>
      This will be a {props.adj} Game!
    </div>
  )
}
