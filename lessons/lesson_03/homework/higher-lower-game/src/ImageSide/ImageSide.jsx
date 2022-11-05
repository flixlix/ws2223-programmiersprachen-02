import React from "react";
import "./ImageSide.css";
import ActionButton from "../ActionButton/ActionButton";

export default function ImageSide({
  source,
  side,
  name,
  searches,
  duetArray,
  handleHigherButtonClick,
  handleLowerButtonClick,
}) {
  return (
    <div className={"image-side-container " + side}>
      <div
        className="image-background"
        style={{
          backgroundImage: `url(${source})`,
        }}
      ></div>
      <div className="description-container">
        <h2>{name ?? "test"}</h2>
        <h3>has</h3>
        {side === "left" && (
          <h3>
            <span className="num-of-searches">
              {" " + Intl.NumberFormat("en-US").format(searches) ?? "null"}
            </span>
          </h3>
        )}
        {side === "right" && (
          <ActionButton
            buttonName="higher"
            duetArray={duetArray}
            handleButtonClick={handleHigherButtonClick}
          />
        )}
        {side === "right" && (
          <ActionButton
            buttonName="lower"
            duetArray={duetArray}
            handleButtonClick={handleLowerButtonClick}
          />
        )}
        <h3>
          {side === "right" ? (
            <p>
              searches than{" "}
              <span className="opponent-name">Cristiano Ronaldo</span>
            </p>
          ) : (
            "average monthly searches"
          )}
        </h3>
      </div>
    </div>
  );
}
