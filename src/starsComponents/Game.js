import React, { useState, useEffect } from "react";
import utils from "../math-utils";

import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";
import StarsDisplay from "./StarsDisplay";

// Custom Hook
// Convention: start custom hooks with 'use...'
// Rule: Don't call hooks inside loops or conditions - always same order!
const useGameState = () => {
  // If we identify a var that will change, generally just create a useState
  // It may not be optimal in the end, but better while figuring it out
  const [stars, setStars] = useState(utils.random(1, 9));

  // When creating state elements, try to use minimum number
  // eg. We could have 'usedNums', but this is just the comp. of 'availableNums'
  // eg. We could have wrong nums, but this can be found from 'candidateNums'
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  // PlayNumber needs to be passed these values!!

  const [secondsLeft, setSecondsLeft] = useState(10);
  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = newCandidateNums => {
    if (utils.sum(newCandidateNums) !== stars) {
      // Not a solution
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      // redraw PLAYABLE number of sums
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const Game = props => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // const gameIsWon = availableNums.length === 0;
  // const gameIsLost = secondsLeft === 0;
  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    // update candidateNums
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => (
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
