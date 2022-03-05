import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplictionData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const stateCopy = { ...state, appointments };
    const updatedDays = updateSpots(stateCopy, stateCopy.day);

    const finalStateCopy = { ...stateCopy, days: updatedDays };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState(finalStateCopy);
    });
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const stateCopy = { ...state, appointments };
    const updatedDays = updateSpots(stateCopy, stateCopy.day);

    const finalStateCopy = { ...stateCopy, days: updatedDays };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState(finalStateCopy);
    });
  };

  const setDay = (day) => {
    setState({ ...state, day });
  };


  const updateSpots = (state, day) => {
    const currentDay = state.days.find((dayItem) => dayItem.name === day);
    const appointmentIds = currentDay.appointments;

    const interviewsForDay = appointmentIds.map(
      (id) => state.appointments[id].interview
    );
    const emptyInterviews = interviewsForDay.filter((interview) => !interview);
    const spotsRemaining = emptyInterviews.length;

    const newDaysArray = state.days.map((day) => {
      if (day.name === currentDay.name) {
        return { ...currentDay, spots: spotsRemaining };
      }
      return day;
    });

    return newDaysArray;
  };

  return { state, cancelInterview, bookInterview, setDay };
}
