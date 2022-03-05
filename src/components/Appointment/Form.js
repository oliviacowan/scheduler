import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")
  const [interviewerError, setInterviewerError] = useState("")
 
  //callback used in the cancel function line 25 - resets any errors, the selected interviewer, and input name
  const reset = function () {
    return (
      <>
        <> {setInterviewer(null)} </>
        <> {setStudent("")} </>
        <> {setError("")} </>
        <>{setInterviewerError("")}</>
      </>
    );
  };

//calls reset and transitions called when cancel is clicked from edit mode or making a new appointment
  const cancel = function () {
    return (
      <>
        <>{reset()}</>
        <>{props.onCancel()}</>
      </>
    );
  };

// shows errors if present, saves appointment
  function save() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setInterviewerError("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
    setError("");
    setInterviewerError("");
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={(event) => {setStudent(event.target.value); setError('')}}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
          setInterviewerError={setInterviewerError}
        />
        <section className="appointment__validation">{interviewerError}</section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
