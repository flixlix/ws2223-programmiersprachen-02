import React from "react";
import "./Result.css";

export default function Result({ state }) {
  return (
    <div className="result-container">
      {state === "correct" ? (
        <div className="result correct"></div>
      ) : state === "incorrect" ? (
        <div className="result incorrect"></div>
      ) : (
        /* if state is "" */
        <div className="result"></div>
      )}
    </div>
  );
}
