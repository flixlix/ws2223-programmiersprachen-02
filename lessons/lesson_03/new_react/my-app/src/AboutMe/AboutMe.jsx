import React from "react";
import { useState } from "react";
import ImgTextSection from "../ImgTextSection/ImgTextSection";
import EditMode from "../EditMode/EditMode";
import "./AboutMe.css";

export default function AboutMe() {
  let selected = "About Me";
  const [state, setState] = useState("default");
  const [paragraphState, setParagraphState] = useState("default");
  const [checkState, setCheckState] = useState(false);
  const [imageState, setImageState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const url =
    "https://images.unsplash.com/photo-1542595715-c44d9b54e733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhdGlub3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
  function handleInputChange(event) {
    setState(event.target.value);
  }
  function handleInputParagraphChange(event) {
    setParagraphState(event.target.value);
  }
  function handleCheckBoxChange(event) {
    setCheckState(event.target.checked);
  }
  function handleImageCheckBoxChange(event) {
    setImageState(event.target.checked);
  }
  function handleEditModeClick() {
    setIsEditMode(!isEditMode);
  }
  return (
    <main>
      {isEditMode ? (
        <div className="edit-mode">
          <button onClick={handleEditModeClick}>
            <svg id="button-edit-mode-icon" viewBox="0 0 24 24">
              <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" />
            </svg>
          </button>
          <EditMode
            selected={selected}
            handleCheckBoxChange={handleCheckBoxChange}
            handleInputChange={handleInputChange}
            handleInputParagraphChange={handleInputParagraphChange}
            handleImageCheckBoxChange={handleImageCheckBoxChange}
            imageState={imageState}
            checkState={checkState}
          />
        </div>
      ) : (
        <div>
          <button onClick={handleEditModeClick}>
            <svg id="button-edit-mode-icon" viewBox="0 0 24 24">
              <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" />
            </svg>
          </button>

          <h1>{state}</h1>
          <h2>
            checkState is:{" "}
            <span className={checkState ? "checked" : "unchecked"}>
              {checkState ? "checked" : "unchecked"}
            </span>
          </h2>
          <ImgTextSection
            showImg={imageState}
            src={url}
            alt="test"
            text={paragraphState}
          />
          <ImgTextSection
            heading={state}
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, cum esse? Voluptas, est non totam cumque rem et. Quasi quas nihil neque, vero rerum assumenda ut veniam a! Quia, sunt molestias? Dolores fugiat enim et consequatur similique cum, fuga libero iste velit at commodi nam temporibus vitae voluptatum illo maxime!"
            alt="2"
            reversed={true}
          />
        </div>
      )}
    </main>
  );
}
