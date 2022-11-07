import Game from "./Game/Game";
import "./App.css";
import CustomHeading from "./CustomHeading/CustomHeading";
import React from "react";

function App() {
  return (
    <div className="App">
      <CustomHeading />
      <Game />
    </div>
  );
}

export default App;
