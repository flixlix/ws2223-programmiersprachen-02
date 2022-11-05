import { useState } from "react";
import axios from "axios";
import React from "react";
import ImageSide from "./ImageSide/ImageSide";
import CustomHeading from "./CustomHeading/CustomHeading";
import Result from "./Result/Result";
import "./App.css";

function App() {
  let [isLoading, setLoading] = useState(true);
  let [result, setResult] = useState(null);
  let [choice, setChoice] = useState(null);
  let [queries, setQueries] = React.useState("");

  let [leftQuery, setLeftQuery] = React.useState("");
  let [rightQuery, setRightQuery] = React.useState("");

  React.useEffect(() => {
    axios
      .get("./data.json")
      .then((response) => {
        setQueries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }, []);

  function handleButtonClick(choice) {
    if (choice === "higher") {
      setChoice("higher");
    } else if (choice === "lower") {
      setChoice("lower");
    }
    handleResult(choice);
  }

  function handleResult(choice) {
    if (choice === "higher" && leftQuery.searches > rightQuery.searches) {
      setResult("incorrect");
    } else if (
      choice === "higher" &&
      leftQuery.searches < rightQuery.searches
    ) {
      setResult("correct");
    } else if (choice === "lower" && leftQuery.searches < rightQuery.searches) {
      setResult("incorrect");
    } else if (choice === "lower" && leftQuery.searches > rightQuery.searches) {
      setResult("correct");
    }
    setChoice(null);
  }

  function getRandomquery() {
    const randomIndex = Math.floor(Math.random() * queries.length);
    const randomQuery = queries[randomIndex];
    return randomQuery;
  }
  leftQuery = getRandomquery();
  rightQuery = getRandomquery();
  if (leftQuery === rightQuery) {
    rightQuery = getRandomquery();
  }
  let duetArray = [leftQuery, rightQuery];
  if (
    isLoading ||
    queries.length === 0 ||
    leftQuery === "" ||
    leftQuery === undefined ||
    rightQuery === "" ||
    rightQuery === undefined
  ) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="react-root">
      <CustomHeading />
      <Result state={result} />
      <ImageSide
        side="left"
        name={leftQuery.name}
        source={leftQuery.src}
        searches={leftQuery.searches}
        duetArray={duetArray}
      />
      <ImageSide
        side="right"
        name={rightQuery.name}
        source={rightQuery.src}
        searches={rightQuery.searches}
        duetArray={duetArray}
        handleHigherButtonClick={handleButtonClick("higher")}
        handleLowerButtonClick={handleButtonClick("lower")}
      />
    </div>
  );
}

export default App;
