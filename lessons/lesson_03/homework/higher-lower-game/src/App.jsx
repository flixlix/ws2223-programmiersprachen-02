import Game from "./Game/Game";
import "./App.css";
import CustomHeading from "./CustomHeading/CustomHeading";
import InfoPopup from "./InfoPopup/InfoPopup";

function App() {
  return (
    <div className="App">
      <CustomHeading />
      <Game />
      <InfoPopup />
    </div>
  );
}

export default App;
