import React from "react";
/* import css */
import "./Scoreboard.css";

export default function Scoreboard({ score, highscore }) {
  return (
    <div className="scoreboard-highscore-container">
      <div className="board-container highscore-container">
        <p className="board-value highscore-value">{highscore}</p>
        <h2 className="board-heading highscore-heading">Highscore</h2>
      </div>
      <div className="board-container scoreboard-container">
        <p className="board-value score-value">{score || 0}</p>
        <h2 className="board-heading score-heading">Score</h2>
      </div>
    </div>
  );
}
