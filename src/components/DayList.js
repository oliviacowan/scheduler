import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, setDay }) {
  const daysList = days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === value}
      setDay={setDay}
    />
  ));

  return <ul>{daysList}</ul>;
}
