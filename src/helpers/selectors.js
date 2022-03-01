
export function getAppointmentsForDay(state, day) {
  const findD = state.days.find((d) => d.name === day)
  if (!findD) {
    return [];
  }
  return findD.appointments.map((id) => state.appointments[id])
}




export function getInterviewersForDay(state, day) {
  // console.log('STATE: ', state);
  // console.log('day: ', day);
  const findD = state.days.find((d) => {
    if (d.name === day){
      return day;
    }
  })

  // console.log('findD', findD)
  if (!findD) {
    return [];
  }
  return findD.interviewers.map((id) => state.interviewers[id])
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

