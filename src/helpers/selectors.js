export function getAppointmentsForDay(state, day) {
  const findD = state.days.find((d) => d.name === day)
  if (!findD) {
    return [];
  }
  return findD.appointments.map((id) => state.appointments[id])
}
