
import { useState } from "react"

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  
  const transition = function(newMode, replace = false) {
    let newHistory = [...history];
    // console.log('1', newHistory)

    if (replace === true) {
      newHistory[newHistory.length - 1] = newMode;
      // console.log('2', newHistory)
      setHistory(newHistory);
    } else {
    newHistory.push(newMode);
    setHistory(newHistory);
    }
  }
  
  const back = function() {
  
    if (history.length < 2) {
      return;
    }
    let newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  }

  const mode = history[history.length -1]
  return { mode, transition, back };
}
