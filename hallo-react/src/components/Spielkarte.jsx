import React from "react"

function suitIcon(suit) {
  switch (suit) {
    case "spades":
      return "♠"
    case "clubs":
      return "♣"
    case "heart":
      return "♥"
    case "diamonds":
      return "♦"
  }
}

function isRed(suit) {
  return suit === "diamonds" || suit === "heart"
}

export default function Spielkarte(props) {
  let cardClass = ["Spielkarte"]
  if (isRed(props.suit)) {
    cardClass.push("rot")
  }

  return (
    <div className={cardClass.join(" ")}>
      <div className="item">
        {props.value}<br/>
        {suitIcon(props.suit)}
      </div>
      <div className="item">
      </div>
      <div className="item">
      </div>
      <div className="item">
      </div>

      <div className="item center">
        {suitIcon(props.suit)}
        {props.value}
      </div>

      <div className="item">
      </div>
      <div className="item">
      </div>
      <div className="item">
      </div>

      <div className="item right">
        {suitIcon(props.suit)}<br/>
        {props.value}
      </div>
    </div>
  )
}
