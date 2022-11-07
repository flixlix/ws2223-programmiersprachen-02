import React from "react";
import "./Result.css";

export default function Result({ state }) {
  return (
    <div className="result-container">
      {state === "correct" ? (
        <div className="result correct">
          <svg
            className="result-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 18.372"
          >
            <path
              id="Union_1"
              data-name="Union 1"
              d="M0,10.813,1.937,8.875,7.562,14.5,22.063,0,24,1.937,9.471,16.466l0,0L7.559,18.372Z"
            />
          </svg>
        </div>
      ) : state === "incorrect" ? (
        <div className="result incorrect">
          <div className="result incorrect">
            <svg
              className="result-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                id="Union_2"
                data-name="Union 2"
                d="M-1138.008,14.528l-9.456,9.456L-1150,21.448l9.456-9.456-9.44-9.44,2.536-2.536,9.44,9.44L-1128.552,0l2.536,2.536-9.456,9.456,9.472,9.472L-1128.536,24Z"
                transform="translate(1150)"
              />
            </svg>
          </div>
        </div>
      ) : (
        /* if state is "" */
        <div className="result"></div>
      )}
    </div>
  );
}
