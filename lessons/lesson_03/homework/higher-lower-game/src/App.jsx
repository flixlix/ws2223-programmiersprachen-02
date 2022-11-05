import Game from "./Game/Game";

// Importing the CSS File
import "./App.css";

// Importing the useState hook
import { useState } from "react";

function App() {
  // Creating a reset state, which indicates whether
  // the game should be reset or not
  const [reset, setReset] = useState(false);

  // Creating a winner state, which indicates
  // the current winner
  const [result, setResult] = useState("");

  // Sets the reset property to true
  // which starts the chain
  // reaction of resetting the board
  const resetBoard = () => {
    console.log("test");
    setReset(true);
  };

  return (
    <div className="App">
      {/* Custom made board component comprising of
			the tic-tac-toe board */}
      <Game
        reset={reset}
        setReset={setReset}
        result={result}
        setResult={setResult}
      />
      {/* Shrinks the popup when there is no winner */}
      <div className={`result ${result !== "" ? "" : "shrink"}`}>
        {/* Display the current winner */}
        <div className="result-text">{result}</div>
        {/* Button used to reset the board */}
        <button onClick={() => resetBoard()}>Reset Board</button>
      </div>
    </div>
  );
}

export default App;
