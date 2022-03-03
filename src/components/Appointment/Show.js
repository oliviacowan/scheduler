import React from "react";

export default function Show({ student, interviewer, onDelete, onEdit }) {
  const deleteAppointment = function () {
    onDelete()
  };
  const edit = function () {
    onEdit()
  };

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={edit}
            // onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={deleteAppointment}
            // {props.onDelete}
          />
        </section>
      </section>
    </main>
  );
};
