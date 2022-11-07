import React from "react";
import "./App.css";
import Game from "./components/Game/Game";
import CustomHeading from "./components/CustomHeading/CustomHeading";

function App() {
  return (
    <div className="App">
      <CustomHeading />
      <Game />
    </div>
  );
}

export default App;
