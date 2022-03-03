
export function getAppointmentsForDay(state, day) {
  const findTheDay = state.days.find((theDay) => theDay.name === day);
  if (!findTheDay) {
    return [];
  }
  return findTheDay.appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  const findTheDay = state.days.find((theDay) => {
    if (theDay.name === day){
      return day;
    }
    return null;
  })

  if (!findTheDay) {
    return [];
  }
  return findTheDay.interviewers.map((id) => state.interviewers[id]);
}


export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const id = interview.interviewer;
  const interviewers = state.interviewers;

  for (let interviewer in interviewers) {
    const here = interviewers[interviewer];
    if (here.id === id) {
      return {
        "student": interview.student.toString(),
        "interviewer": here
      }
    }
  }
  
}

