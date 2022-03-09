import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplictionData() {
  // define and set states / initial states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // make requests to api needed for the application to work
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
  // set states with data from api
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const cancelInterview = function (id) {
    // find the appointment with the given id
    const appointment = {
      ...state.appointments[id],
    // set interview to null to cancel it
      interview: null,
    };
    const appointments = {
      // find appointment with given id and set its value to the newly made appointment object
      ...state.appointments,
      [id]: appointment,
    };
    // copy state and add the new appointments object to it
    const stateCopy = { ...state, appointments };
    // calls updateSpots function to update remaining spots for the day where the interview was cancelled
    const updatedDays = updateSpots(stateCopy, stateCopy.day);
    // use the previously made copy and pass in the updated days key value pair
    const finalStateCopy = { ...stateCopy, days: updatedDays };
    
    // make request to api to delete appointment
    return axios.delete(`/api/appointments/${id}`).then(() => {
    // set state with the previously made final copy
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
    // copy state and add the new appointments object to it
    const stateCopy = { ...state, appointments };
    // calls updateSpots function to update remaining spots for the day where the interview was cancelled
    const updatedDays = updateSpots(stateCopy, stateCopy.day);
   // use the previously made copy and pass in the updated days key value pair
    const finalStateCopy = { ...stateCopy, days: updatedDays };
  // make request to api to create appointment
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // set state with the previously made final copy
      setState(finalStateCopy);
    });
  };
  //used in the dayList to set which day is selected
  const setDay = (day) => {
    setState({ ...state, day });
  };


  const updateSpots = (state, day) => {
    // find the current which dayItem matches the passed in day
    const currentDay = state.days.find((dayItem) => dayItem.name === day);
    // get array of appointment ids from the current day
    const appointmentIds = currentDay.appointments;
    // map over the appointment ids and return the interview with that appointment id 
    const interviewsForDay = appointmentIds.map(
      (id) => state.appointments[id].interview
    );
    // create array of interviews where the interview value is null
    const emptyInterviews = interviewsForDay.filter((interview) => !interview);
    // count items in array to find amount of empty interviews
    const spotsRemaining = emptyInterviews.length;
    // create new array of the days
    const newDaysArray = state.days.map((day) => {
    // check if the day is the one we just updated spots of
      if (day.name === currentDay.name) {
    // if it is, copy it and replace the spots with our new spots variable 
        return { ...currentDay, spots: spotsRemaining };
      }
    // otherwise return the day object as is
      return day;
    });
    // return the array
    return newDaysArray;
  };

  return { state, cancelInterview, bookInterview, setDay };
}
