import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageSide from "../ImageSide/ImageSide";
import Result from "../Result/Result";
import Scoreboard from "../Scoreboard/Scoreboard";
import InfoPopup from "../InfoPopup/InfoPopup";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Game.css";

/* game logic and game display */

export default function Game() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [highscore, setHighscore] = useState(0);
  const [round, setRound] = useState(0);
  const [response, setResponse] = useState([]);
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState(false);
  const [wait, setWait] = useState(false);

  /* array with both objects displayed, first object is displayed on the left side */
  const [duetArray, setDuetArray] = useState([
    { src: "", name: "", searches: 0 },
    { src: "", name: "", searches: 0 },
  ]);

  /* declaration of loading time in seconds */
  let loadingTime = 4;

  /* fetch data.json containing all contestants */
  async function fetch() {
    await axios
      .get("./data.json", {
        onDownloadProgress: (progressEvent) => {
          /* console.log(
            "downloaded",
            Math.floor(progressEvent.progress * 100) + "%"
          ); */
        },
      })

      /* run this after data was fetched */
      .then((response) => {
        /* set response state */
        setResponse(response.data);

        /* after 2 seconds */
        setTimeout(() => {
          /* set isLoading state to false */
          setIsLoading(false);
        }, loadingTime * 1000 /* multiply loading time by 1000 to get millis */);

        /* create duet from two random contestants */
        getDuet(response.data);
      })

      /* run if there was an error fetching the data */
      .catch((error) => {
        /* after x seconds */
        setTimeout(() => {
          /* set error state to error given */
          setError(error);
          console.error("This is the error: ", error);
        }, loadingTime * 1000 /* multiply loading time by 1000 to get millis */);
      });
  }

  /* run fetch function after first render */
  useEffect(() => {
    fetch();
  }, []);

  /* returns random item from array in argument */
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* handles button click */
  function changeChoice(buttonChoice) {
    /* ignore if between two rounds and animation is still running */
    if (wait) return;

    /* update choice state with value of argument */
    setChoice(buttonChoice);

    /* check if guess was correct or not */
    getResult(buttonChoice);
  }

  /* game logic */
  function getResult(choice) {
    /* if user clicked the higher button */
    if (choice === "higher") {
      /* if left topic has less or equal searches */
      if (duetArray[0].searches <= duetArray[1].searches) {
        /* set result state to correct */
        setResult("correct");
      } else {
        /* set result state to incorrect */
        setResult("incorrect");
      }
    } else if (choice === "lower") {
      /* else if user clicked the lower button */

      /* if left topic has more or equal searches */
      if (duetArray[0].searches >= duetArray[1].searches) {
        /* set result state to correct */
        setResult("correct");
      } else {
        /* set result state to incorrect */
        setResult("incorrect");
      }
    }
  }

  /* prepare board for the next round */
  function startNextRound(duetArray) {
    /* moves all items in array to the left */
    /* left topic gets deleted, right topic goes to the left side */
    duetArray.shift();

    /* get new random item to display on the right side */
    let newItem = getRandomItem(response);

    /* avoid duplicate topics */

    /* while new item is the same as the left topic */
    while (duetArray[0].name === newItem.name) {
      /* get new random item */
      newItem = getRandomItem(response);
    }

    /* add new item to the right side */
    duetArray.push(newItem);

    /* increment round state */
    setRound(round + 1);
  }

  /* function to restart game */
  function restartGame() {
    /* reset round state hook */
    setRound(0);

    /* create completely new array of two topics */
    getDuet(response);
  }

  /* create duet from two random contestants */
  /* get two random items from response state */
  function getDuet(response) {
    /* create new empty array of duet */
    let duet = [];

    /* create new item in array out of one of the contestants  */
    duet.push(getRandomItem(response));

    /* create new item in array out of one of the contestants  */
    duet.push(getRandomItem(response));

    /* if equal items were chosen */
    while (duet[0].name === duet[1].name) {
      /* replace last item in array again */
      duet[1] = getRandomItem(response);
    }

    /* update duet array state hook with newly created duet array */
    setDuetArray(duet);
  }

  /* everytime result is updated */
  useEffect(
    () => {
      /* update wait state hook to true */
      setWait(true);

      /* perform actions after one second */
      setTimeout(() => {
        /* if result is correct */
        if (result === "correct") {
          /* start new round */
          startNextRound(duetArray);
        } else if (result === "incorrect") {
          /* if result is incorrect */

          /* restart game */
          restartGame();
        }

        /* reset user choice state hook to default after delay */
        setChoice("");

        /* reset result state hook to default */
        setResult("");

        /* set wait state hook to false to allow new user input */
        setWait(false);
      }, 1000 /* 1 second */);
    },
    [result] /* update upon result update */
  );

  /* update highscore state hook if round is higher than highscore */
  useEffect(
    () => {
      if (round > highscore) {
        setHighscore(round);
      }
    },
    [round] /* update upon round update */
  );

  return (
    <div className="game-container">
      {/* display loading animation */}
      {isLoading ? (
        <ProgressBar eta={loadingTime} />
      ) : (
        <div className="game-container">
          <Scoreboard score={round} highscore={highscore} />
          {/* display if guess was correct or not */}
          <Result state={result} />
          <div className="duet-container">
            {/* display left topic */}
            <ImageSide
              side="left"
              index={0}
              duetArray={duetArray}
              changeChoice={changeChoice}
            />
            {/* display right topic */}
            <ImageSide
              side="right"
              index={1}
              duetArray={duetArray}
              changeChoice={changeChoice}
            />
          </div>
          <InfoPopup />
        </div>
      )}
      {/* if there is an error */}
      {error && (
        <div className="error">
          <p className="error-warning-text">⚠️ Something went wrong ⚠️</p>
          <span className="error-message">
            {error.response.status} {"-"} {error.response.statusText} {"("}
            {error.config.url}
            {")"}
          </span>
          <div className="error-stack">{error.stack}</div>
        </div>
      )}
    </div>
  );
}
