import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };

  function destroy(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(CONFIRM, true);
    transition(DELETING, true);
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY));
  }

  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && (
          <Empty
            onAdd={() => transition(CREATE)}
            onEdit={() => {
              transition(EDIT);
            }}
          />
        )}
        {mode === SHOW && (
          <Show
            interview={props.interview}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
          />
        )}

        {mode === CREATE && (
          <Form
            onCancel={back}
            onSave={save}
            interviewers={props.interviewers}
          />
        )}
        {mode === SAVING && <Status />}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you want to delete"}
            onCancel={() => {
              transition(SHOW);
            }}
            onConfirm={destroy}
          />
        )}
      </article>
    </>
  );
}
