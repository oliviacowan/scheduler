import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";


export default function InterviewerList({interviewers, value, onChange, setInterviewerError}) {
 
  const allInterviewers = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => {onChange(interviewer.id); setInterviewerError('')}}
      
    />
  ));
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{allInterviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  allInterviewers: PropTypes.array
};
