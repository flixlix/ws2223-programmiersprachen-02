import React from "react";
import "./ActionButton.css";

export default function ActionButton({ buttonName, changeChoice }) {
  return (
    <div>
      <button
        /* two classes, first class is the name of the button, second class is "action-button" (needs space before action-button to distinguish both classes) */
        className={buttonName + " action-button"}
        /* call changeChoice function and pass buttonName as argument */
        onClick={() => changeChoice(buttonName)}
      >
        {/* Text on Button is buttonName */}
        {buttonName}
      </button>
    </div>
  );
}
