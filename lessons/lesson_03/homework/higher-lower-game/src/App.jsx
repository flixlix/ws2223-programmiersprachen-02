import { useState } from "react";
import axios from "axios";
import React from "react";
import ImageSide from "./ImageSide/ImageSide";
import CustomHeading from "./CustomHeading/CustomHeading";
import "./App.css";

function App() {
  let [isLoading, setLoading] = useState(true);
  let [queries, setQueries] = React.useState("");
  let [leftQuery, setLeftQuery] = React.useState("");
  let [rightQuery, setRightQuery] = React.useState("");
  React.useEffect(() => {
    axios
      .get("./data.json")
      .then((response) => {
        setQueries(response.data);
        console.log(queries);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      />
    </div>
  );
}

export default App;
