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

export default function Appointment(props) {
  // console.log('PROPS: ', props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    //console.log('saving');
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE), true);
  };

  // function destroy(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer,
  //   };
  //   transition(DELETING, true);
  //   transition(CONFIRM, true);
  //   props.cancelInterview(props.id, interview)
  //   .then(() => transition(EMPTY))
  //   .catch(error => transition(ERROR_DELETE), true);
  // }

  function destroy(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE), true);
  }

  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            interview={props.interview}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}

        {mode === CREATE && (
          <Form
            onCancel={back}
            onSave={save}
            interviewers={props.interviewers}
          />
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
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === ERROR_SAVE && (
          <Error
            message={"Could not save appointment"}
            onClose={() => {
              transition(EMPTY);
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
}
