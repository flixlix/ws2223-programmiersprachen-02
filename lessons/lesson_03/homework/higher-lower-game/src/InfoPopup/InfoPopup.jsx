import React, { useEffect } from "react";
import "./InfoPopup.css";
import { useState } from "react";

export default function InfoPopup() {
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  useEffect(() => {
    setIsInfoPopupOpen(false);
  }, []);
  return (
    <div>
      <button
        className="info-button popup-button"
        onClick={() => setIsInfoPopupOpen(!isInfoPopupOpen)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
        </svg>
      </button>
      {isInfoPopupOpen && (
        <div className="info-popup-container">
          <div className="info-popup">
            <div className="info-popup-body">
              <h2>Idea of the Game</h2>
              <p>
                This game displays two different, <br /> completely random
                search topics from Google.
              </p>
              <h2>How to play</h2>
              <ol>
                <li>Look at the average monthly searches of the left topic</li>
                <li>
                  Guess, if the right search topic has more or less average
                  monthly searches
                </li>
                <li>
                  If your guess was{" "}
                  <span className="correct-text">correct</span>
                  <ul>
                    <li>You get a point</li>
                    <li>The left topic will disappear </li>
                    <li>The right topic will travel to the left</li>
                    <li>A new topic appears on the right side</li>
                  </ul>
                </li>
                <li>
                  If your guess was{" "}
                  <span className="incorrect-text">incorrect</span>
                  <ul>
                    <li>You lose all points</li>
                    <li>All topics will disappear</li>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="info-popup-footer">
              <p>A Project made by: Luca Ziegler</p>
              {/* button sending to github */}
              <a
                href="https://github.com/flixlix/ws2223-programmiersprachen-02/tree/new-approach/lessons/lesson_03/homework/higher-lower-game"
                target="_blank"
                rel="noreferrer"
              >
                <button className="github">Github</button>
              </a>
            </div>
          </div>

          <button
            className="close-button popup-button"
            onClick={() => setIsInfoPopupOpen(!isInfoPopupOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
