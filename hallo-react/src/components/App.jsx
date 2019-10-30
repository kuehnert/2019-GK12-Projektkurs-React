import React from "react"

import Game from "./Game"
import Spielkarte from "./Spielkarte";

export default function App() {
  return (
    <div>
      <h1>Ich bin der Beste!</h1>
      <div className="Karten">
        <Game player="Klaus" adj="great" />
        <Game player="Matthias" adj="super" />
        <Game player="Marius" adj="fantastic" />
      </div>

      <div className="Karten">
        <Spielkarte suit="clubs" value="7" />
        <Spielkarte suit="spades" value="A" />
        <Spielkarte suit="heart" value="K" />
        <Spielkarte suit="diamonds" value="3" />
      </div>
    </div>
  )
}
