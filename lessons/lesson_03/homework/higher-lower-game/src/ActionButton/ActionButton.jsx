import React from "react";
import "./ActionButton.css";

export default function ActionButton({
  buttonName,
  duetArray,
  handleButtonClick,
}) {
  return (
    <div>
      <button
        className={buttonName + " action-button"}
        onClick={handleButtonClick}
      >
        {buttonName}
      </button>
    </div>
  );
}
