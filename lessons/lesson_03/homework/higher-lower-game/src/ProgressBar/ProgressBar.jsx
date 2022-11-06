import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ eta }) {
  return (
    <div className="progress">
      {/* progress */}
      <div
        className="progress-value"
        style={{
          animationDuration:
            eta + "s" /* add "s" so that css reads it as seconds */,
        }}
      ></div>
    </div>
  );
}
