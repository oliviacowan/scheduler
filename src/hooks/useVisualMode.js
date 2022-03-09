import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function (updatedMode, replace) {

    setMode(updatedMode)
    // check if replace argument is true
    if (replace) {
    // remove last value of prev history array and replace with the mode being passed in (updatedMode) 
      setHistory((prev) => [...prev.slice(0, -1), updatedMode])
    } else {
    // otherwise just add the new mode on to the end
      setHistory((prev) => [...prev, updatedMode])
    }
  };

  const back = function () {
  // checks if array is long enough to be able to go back
    if (history.length > 1) {
  // sets the mode to the second to last mode in the array
      setMode(history[history.length - 2])
  // removes the last mode from the end of the history array
      setHistory((prev) => [...prev.slice(0, -1)])
    }
  };

  return { mode, transition, back };
}
