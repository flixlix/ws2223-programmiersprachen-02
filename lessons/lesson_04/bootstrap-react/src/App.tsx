import { useState } from "react";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);

  return (
    <div className="App">
      <Button variant="primary">
        Primary
      </Button>{" "}
      <Button variant="outline-secondary">Secondary</Button>{" "}
      <Button variant="primary" onClick={() => setCount(count + 1)}>
        count is: {count}
      </Button>
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        color="primary"
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        Checked
      </ToggleButton>
    </div>
  );
}

export default App;
