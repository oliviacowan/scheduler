import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function (updatedMode, replace) {

    setMode(updatedMode)

    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), updatedMode])
    } else {
      setHistory((prev) => [...prev, updatedMode])
    }
    // let newHistory = [...history];

    // if (replace === true) {
    //   newHistory[newHistory.length - 1] = newMode;
    //   setHistory(newHistory);
    // } else {
    //   setHistory((prev) => [...prev, newMode]);
    // }
  };

  const back = function () {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      setHistory((prev) => [...prev.slice(0, -1)])
    }
    // if (history.length < 2) {
    //   return;
    // }
    // let newHistory = [...history];
    // newHistory.pop();
    // setHistory(newHistory);
  };

  // mode = history[history.length - 1];
  return { mode, transition, back };
}
