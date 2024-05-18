import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AiOutlineEye } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";

const Exercise = (props) => {
  console.log("Summaries:", props.exercise.summaries);
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.exercise.def_name}</td>
      {/* <td>{props.exercise.def_addr}</td> */}
      <td>{props.exercise.crime_type}</td>
      <td>{moment(props.exercise.crime_date).format("MMM Do YY")}</td>
      {/* <td>{props.exercise.crime_location}</td> */}
      <td>{props.exercise.ao_name}</td>
      <td>{moment(props.exercise.arrest_date).format("MMM Do YY")}</td>
      <td>{props.exercise.judge_name}</td>
      <td>{props.exercise.lawyer_name}</td>
      <td>{props.exercise.prosecutor_name}</td>
      <td>{moment(props.exercise.start_date).format("MMM Do YY")}</td>
      <td>{moment(props.exercise.end_date).format("MMM Do YY")}</td>
      {/* <td>
        {props.exercise.summaries &&
          props.exercise.summaries.map((summary, sIndex) => (
            <div key={sIndex}>
              <div>
                <b>Hearing Date:</b>{" "}
                {new Date(summary.hearingDate).toLocaleDateString()}
              </div>
              <div>
                <b>Summary:</b> {summary.summary}
              </div>
              <hr />
            </div>
          ))}
      </td> */}
      <td id="view">
        <Link to={"/viewcase/" + props.exercise._id}>
          <AiOutlineEye color="#000" />
        </Link>
      </td>
    </tr>
  );
};

export default class PastCasesList extends Component {
  constructor(props) {
    super(props);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/cases/resolvedCases")
      .then((response) => {
        console.log(response.data);
        this.setState({ exercises: response.data });
      })
      .catch((err) => console.log(err));
  }

  exerciseList = () => {
    return this.state.exercises.map((currentExercise, id) => {
      return (
        <Exercise
          exercise={currentExercise}
          id={id + 1}
          key={currentExercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div style={{ margin: "1em 0.5em" }}>
        <h2>Resolved Cases</h2>
        <table class="table" style={{ marginBottom: "2em" }}>
          <thead>
            <tr>
              <th>CIN</th>
              <th>Defandant Name</th>
              {/* <th>Defandant Addr</th> */}
              <th>Crime type</th>
              <th>Crime date</th>
              {/* <th>Crime location</th> */}
              <th>Arresting Officer</th>
              <th>Arrest date</th>
              <th>Judge name</th>
              <th>Lawyer name</th>
              <th>Prosecutor name</th>
              <th>Start date</th>
              <th>End date</th>
              {/* <th>Adjournment</th> */}
              {/* <th>Actions</th> */}
              {/* <th>Status</th> */}
              {/* <th>Summary</th> */}
              <th>View</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
        {this.state.exercises.length === 0 && <div style={{textAlign:"center"}}>No past cases</div>}
      </div>
    );
  }
}
