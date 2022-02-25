import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  // console.log("Form", props);
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function () {
    return (
      <>
        <> {setInterviewer(null)} </>
        <> {setStudent("")} </>
      </>
    );
  };

  const cancel = function () {
    return (
      <>
        <>{reset()}</>
        <>{props.onCancel()}</>
      </>
    );
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
            /*
          This must be a controlled component
          your code goes here
        */
          />
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
          /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => {props.onSave(student, interviewer)}}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
