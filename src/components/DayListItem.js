import React from "react";
import classNames from "classnames";
import "./DayListItem.scss"


export default function DayListItem(props) {
// console.log(props);
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  })

  const formatSpots = function() {
    return (
      <>
      {!props.spots && <>no spots remaining</>}
      {props.spots === 1 && <>1 spot remaining</>}
      {props.spots > 1 && <span>{props.spots} spots remaining</span>}
      </>
    )
  }
  return (
    <li 
    onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day"
      
    >
      <h2 className="text--regular">{props.name}</h2>
      {/* <h3 className="text--light">{props.spots} spots remaining</h3> */}
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}