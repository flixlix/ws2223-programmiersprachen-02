import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageSide from "../ImageSide/ImageSide";

export default function Game({ reset, setReset, result, setResult }) {
  const [round, setRound] = useState(0);
  const [response, setResponse] = useState([]);
  const [duetArray, setDuetArray] = useState([
    { src: "", name: "" },
    { src: "", name: "" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetch() {
    await axios
      .get("./data.json")
      .then((response) => {
        setResponse(response.data);
        setIsLoading(false);
        getDuet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetch();
  }, []);

  function getRandomItem(response) {
    return response[Math.floor(Math.random() * response.length)];
  }

  function getDuet(response) {
    let duet = [];
    duet.push(getRandomItem(response));
    duet.push(getRandomItem(response));
    /* if same items were chosen */
    if (duet[0].name === duet[1].name) {
      /* replace last item in array again */
      duet[1] = getRandomItem(response);
    }
    setDuetArray(duet);
  }
  console.log(duetArray);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="game-container">
          <ImageSide side="left" index={0} duetArray={duetArray} />
          <ImageSide side="right" index={1} duetArray={duetArray} />
        </div>
      )}
    </div>
  );
}
