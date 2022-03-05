import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment({
  interview,
  id,
  interviewers,
  bookInterview,
  cancelInterview,
  time,
}) {

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

//saves an appointment with name of the student and data of the interviewer
  const save = function (name, interviewer) {
    const interviewObj = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interviewObj)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE), true);
  };

  // when confirm is clicked cancelInterview is called and correct modes are transitioned to
  function destroy() {
    console.log('destroy')
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE), true);
  };

  return (
    <>
      <article className="appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            interview={interview}
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}

        {mode === CREATE && (
          <Form onCancel={back} onSave={save} interviewers={interviewers} />
        )}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you want to delete?"}
            onCancel={() => {
              transition(SHOW);
            }}
            onConfirm={destroy}
          />
        )}
        {mode === EDIT && (
          <Form
            student={interview && interview.student}
            interviewer={interview && interview.interviewer.id}
            interviewers={interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === ERROR_SAVE && (
          <Error
            message={"Could not save appointment"}
            onClose={() => {
              transition(EDIT); //EDIT???
            }}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"Could not cancel appointment"}
            onClose={() => {
              transition(SHOW);
            }}
          />
        )}
      </article>
    </>
  );
};
