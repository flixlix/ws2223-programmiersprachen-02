import React from "react";
import "./ActionButton.css";

export default function ActionButton({ buttonName }) {
  function handleButtonClick(event) {
    console.log(event.target.innerHTML);
  }
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
