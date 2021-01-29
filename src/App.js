import React, { useState } from "react";
import "./App.scss";
import "./AppCards.scss";
import Game from "./starsComponents/Game";
import GitApp from "./cardsComponents/GitApp";

function App() {
  // Change between GitApp and StarMatch
  return <StarMatch title="The GitHub Cards App" />;
}

const StarMatch = () => {
  // Changing the key will define an entirely new element
  // Hence, react will remount a new game
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default App;
