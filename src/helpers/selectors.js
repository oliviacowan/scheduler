
export function getAppointmentsForDay(state, day) {
  // find the day where the name of the passed in day matches it
  const findTheDay = state.days.find((theDay) => theDay.name === day);
  // if falsey, return an empty array
  if (!findTheDay) {
    return [];
  }
  // otherwise return an array of appointments for that particular day
  return findTheDay.appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  // find the day where the name of the passed in day matches it
  const findTheDay = state.days.find((theDay) => {
    if (theDay.name === day){
      return day;
    }
    return null;
  })

  if (!findTheDay) {
    return [];
  }
  // otherwise return an array of interviewers for that particular day
  return findTheDay.interviewers.map((id) => state.interviewers[id]);
}


export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  // find id of interviewer
  const id = interview.interviewer;
  // decalre variable for the interviewers in the state
  const interviewers = state.interviewers;
  // loop over interviewers checking if their id matches the interviewers id 
  for (let interviewer in interviewers) {
    const thisInterviewer = interviewers[interviewer];
  // check if the particular interviewer id matches the id of the passed in interviews interviewer
    if (thisInterviewer.id === id) {
  // if it does, return student and interviewer in an object
      return {
        "student": interview.student.toString(),
        "interviewer": thisInterviewer
      }
    }
  }
  
}

