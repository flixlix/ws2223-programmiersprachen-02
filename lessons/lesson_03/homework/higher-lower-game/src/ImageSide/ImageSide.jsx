import React from "react";
import "./ImageSide.css";
import ActionButton from "../ActionButton/ActionButton";

export default function ImageSide({ source, side, name, searches }) {
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
            <span>{" " + searches ?? "null"}</span>
          </h3>
        )}
        {side === "right" && <ActionButton buttonName="higher" />}
        {side === "right" && <ActionButton buttonName="lower" />}
        <h3>
          {side === "right"
            ? "searches than Cristiano Ronaldo"
            : "average monthly searches"}
        </h3>
      </div>
    </div>
  );
}
