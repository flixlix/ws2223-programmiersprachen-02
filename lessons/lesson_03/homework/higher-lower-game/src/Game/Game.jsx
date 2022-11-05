import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageSide from "../ImageSide/ImageSide";
import Result from "../Result/Result";

export default function Game({ reset, setReset }) {
  const [round, setRound] = useState(0);
  const [response, setResponse] = useState([]);
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState(false);
  const [duetArray, setDuetArray] = useState([
    { src: "", name: "" },
    { src: "", name: "" },
  ]);
  function changeChoice(choice) {
    console.log(choice);
  }
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

  function changeChoice(buttonChoice) {
    setChoice(buttonChoice);
    getResult(buttonChoice);
  }

  function getResult(choice) {
    console.log(duetArray);
    console.log(choice);
    if (choice === "higher") {
      if (duetArray[0].searches < duetArray[1].searches) {
        setResult("correct");
        startNextRound(duetArray);
      } else {
        setResult("incorrect");
      }
    } else if (choice === "lower") {
      if (duetArray[0].searches > duetArray[1].searches) {
        setResult("correct");
        startNextRound(duetArray);
      } else {
        setResult("incorect");
      }
    }
    /* after 1 second, set result to "" */
    setTimeout(() => {
      setResult("");
    }, 1000);
  }

  function startNextRound(duetArray) {
    duetArray.shift();
    let newItem = getRandomItem(response);
    while (duetArray[0].name === newItem.name) {
      newItem = getRandomItem(response);
    }
    duetArray.push(newItem);
    setRound(round + 1);
  }

  function getDuet(response) {
    let duet = [];
    duet.push(getRandomItem(response));
    duet.push(getRandomItem(response));
    /* if same items were chosen */
    while (duet[0].name === duet[1].name) {
      /* replace last item in array again */
      duet[1] = getRandomItem(response);
    }
    setDuetArray(duet);
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="game-container">
          <Result state={result} />
          <ImageSide
            side="left"
            index={0}
            duetArray={duetArray}
            changeChoice={changeChoice}
          />
          <ImageSide
            side="right"
            index={1}
            duetArray={duetArray}
            changeChoice={changeChoice}
          />
        </div>
      )}
    </div>
  );
}
