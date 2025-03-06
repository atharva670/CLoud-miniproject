import React, { useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "react-chessboard";

const App = () => {
  const [game, setGame] = useState(new Chess());

  const makeMove = (move) => {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    if (result) setGame(gameCopy);
  };

  return (
    <div>
      <h1>Cloud Chess</h1>
      <Chessboard position={game.fen()} onPieceDrop={(source, target) => makeMove({ from: source, to: target })} />
    </div>
  );
};

export default App;
