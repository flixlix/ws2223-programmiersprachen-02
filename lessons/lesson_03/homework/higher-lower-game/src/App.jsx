import { useState } from "react";
import ImageSide from "./ImageSide/ImageSide";
import CustomHeading from "./CustomHeading/CustomHeading";
import "./App.css";

function App() {
  return (
    <div className="react-root">
      <CustomHeading />
      <ImageSide
        source="./src/assets/1.jpg"
        side="left"
        name="Cristiano Ronaldo"
        searches="1,000,000"
      />
      <ImageSide
        source="./src/assets/2.jpg"
        side="right"
        name="Albert Einstein"
        searches="1.5M"
      />
    </div>
  );
}

export default App;
