import React from "react";

export default function Result({ state }) {
  return (
    <div>
      {state ? (
        <div className="wrong-box">Wrong</div>
      ) : (
        <div className="correct-box">Correct</div>
      )}
    </div>
  );
}
