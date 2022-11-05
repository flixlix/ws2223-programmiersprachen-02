import React from "react";
import "./ActionButton.css";

export default function ActionButton({ buttonName, duetArray }) {
  function handleButtonClick(event) {
    if (duetArray[0].searches < duetArray[1].searches) {
      if (event.target.classList[0] === "higher") {
        console.log("correct");
      } else {
        console.log("wrong");
      }
    } else {
      if (event.target.classList[0] === "lower") {
        console.log("correct");
      } else {
        console.log("wrong");
      }
    }
    console.log(duetArray[0].searches);
    console.log(duetArray[1].searches);
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
