import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    let newHistory = [...history];

    if (replace === true) {
      newHistory[newHistory.length - 1] = newMode;
      setHistory(newHistory);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = function () {
    if (history.length < 2) {
      return;
    }
    let newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  const mode = history[history.length - 1];
  return { mode, transition, back };
}
