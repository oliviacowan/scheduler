import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem({selected, spots, name, setDay}) {
  
    const dayClass = classNames("day-list__item", {
      "day-list__item--selected": selected,
      "day-list__item--full": !spots
    })
  
    const formatSpots = function() {
      return (
        <>
        {!spots && <>no spots remaining</>}
        {spots === 1 && <>1 spot remaining</>}
        {spots > 1 && <span>{spots} spots remaining</span>}
        </>
      );
    };
    return (
      <li 
      onClick={() => setDay(name)}
        className={dayClass}
        data-testid="day"
        
      >
        <h2 className="text--regular">{name}</h2>
        <h3 className="text--light">{formatSpots(spots)}</h3>
      </li>
    );
  };
