import React from "react";
import "./ImageSide.css";
import ActionButton from "../ActionButton/ActionButton";

export default function ImageSide({ side, index, duetArray, changeChoice }) {
  return (
    <div className={"image-side-container " + side}>
      <div
        className="image-background"
        style={{
          backgroundImage: `url(${duetArray[index].src})`,
        }}
      ></div>
      <div className="description-container">
        <h2>{duetArray[index].name ?? "test"}</h2>
        <h3>has</h3>
        {side === "left" && (
          <h3>
            <span className="num-of-searches">
              {" " +
                Intl.NumberFormat("en-US").format(duetArray[index].searches) ??
                "null"}
            </span>
          </h3>
        )}
        {side === "right" && (
          <ActionButton buttonName="higher" changeChoice={changeChoice} />
        )}
        {side === "right" && (
          <ActionButton buttonName="lower" changeChoice={changeChoice} />
        )}
        <h3>
          {side === "right" ? (
            <p>
              searches than{" "}
              <span className="opponent-name">{duetArray[1 - index].name}</span>
            </p>
          ) : (
            "average monthly searches"
          )}
        </h3>
      </div>
    </div>
  );
}
