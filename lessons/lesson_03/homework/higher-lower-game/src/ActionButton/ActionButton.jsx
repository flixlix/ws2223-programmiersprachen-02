import React from "react";
import "./ActionButton.css";
import Game from "../Game/Game";

export default function ActionButton({ buttonName, duetArray, changeChoice }) {
  return (
    <div>
      <button
        className={buttonName + " action-button"}
        onClick={() => changeChoice(buttonName)}
      >
        {buttonName}
      </button>
    </div>
  );
}
