import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

const Exercise = (props) => (
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
    <td id="view">
      <Link to={"/viewcase/" + props.exercise._id}>
        <AiOutlineEye color="#000" />
      </Link>
    </td>
  </tr>
);

export default class UpcomingCasesList extends Component {
  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this);

    // this.exerciseList = this.exerciseList.bind(this);

    this.state = { exercises: [] };
  }
  setExercises = async (exerciseList) => {
    await this.setState({exercises: exerciseList});
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/cases/upcomingCases")
      .then(response => {
        this.setExercises(response.data);
      })
      .catch((err) => console.log(err));
  }

  exerciseList = () => {
    const registrar = localStorage.getItem("registrar");
    console.log(registrar);
    // console.log(this.)
    return this.state.exercises.map((currentExercise, id) => {
      return (
        <Exercise
          registrar={registrar}
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
        <h3>Upcoming Cases</h3>
        <table class="table" style={{ marginBottom: "2em" }}>
          {/* <table className="table"> */}
            <thead>
              <tr>
                <th>CIN</th>
                <th>Defandant Name</th>
                <th>Crime type</th>
                <th>Crime date</th>
                <th>Arresting Officer</th>
                <th>Arrest date</th>
                <th>Judge name</th>
                <th>Lawyer name</th>
                <th>Prosecutor name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{this.exerciseList()}</tbody>
          {/* </table> */}
        </table>
        {this.state.exercises.length === 0 && <div style={{textAlign:"center"}}>No upcoming cases</div>}
      </div>
    );
  }
}
