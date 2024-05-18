import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import { withRouter } from "react-router-dom";
import customFetch from "../utils/axios";

class UpdateCase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      case_created: false,
      def_name: "",
      def_addr: "",
      crime_type: "",
      crime_date: new Date(),
      crime_location: "",
      ao_name: "",
      arrest_date: new Date(),
      judge_name: "",
      lawyer_name: "",
      prosecutor_name: "",
      start_date: new Date(),
      end_date: new Date(),
      status: "",
      summaries: [],
    };

    this.onChangeDefName = this.onChangeDefName.bind(this);
    this.onChangeDefAddr = this.onChangeDefAddr.bind(this);
    this.onChangeCrimeType = this.onChangeCrimeType.bind(this);
    this.onChangeCrimeDate = this.onChangeCrimeDate.bind(this);
    this.onChangeCrimeLoc = this.onChangeCrimeLoc.bind(this);
    this.onChangeAoName = this.onChangeAoName.bind(this);
    this.onChangeArrestDate = this.onChangeArrestDate.bind(this);
    this.onChangeJudgeName = this.onChangeJudgeName.bind(this);
    this.onChangeLawyerName = this.onChangeLawyerName.bind(this);
    this.onChangeProsecutorName = this.onChangeProsecutorName.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeSummary = this.onChangeSummary.bind(this);
    this.onChangeHearingDate = this.onChangeHearingDate.bind(this);
    this.addSummary = this.addSummary.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get("http://localhost:5000/exercises/" + id)
      .then((response) => {
        const data = response.data;
        this.setState({
          def_name: data.def_name,
          def_addr: data.def_addr,
          crime_type: data.crime_type,
          crime_date: Date.parse(data.crime_date),
          crime_location: data.crime_location,
          ao_name: data.ao_name,
          arrest_date: Date.parse(data.arrest_date),
          judge_name: data.judge_name,
          lawyer_name: data.lawyer_name,
          prosecutor_name: data.prosecutor_name,
          start_date: Date.parse(data.start_date),
          end_date: Date.parse(data.end_date),
          status: data.status,
          summary: data.summary,
          summaries: data.summaries,
        });
      })
      .catch((err) => console.log(err));
    console.log(id);
    console.log(this.state);
  }

  onChangeDefName(e) {
    this.setState({
      def_name: e.target.value,
    });
  }

  onChangeDefAddr(e) {
    this.setState({
      def_addr: e.target.value,
    });
  }

  onChangeCrimeType(e) {
    this.setState({
      crime_type: e.target.value,
    });
  }
  onChangeCrimeDate(date) {
    this.setState({
      crime_date: date,
    });
  }
  onChangeCrimeLoc(e) {
    this.setState({
      crime_location: e.target.value,
    });
  }

  onChangeAoName(e) {
    this.setState({
      ao_name: e.target.value,
    });
  }

  onChangeArrestDate(date) {
    this.setState({
      arrest_date: date,
    });
  }
  onChangeJudgeName(e) {
    this.setState({
      judge_name: e.target.value,
    });
  }

  onChangeLawyerName(e) {
    this.setState({
      lawyer_name: e.target.value,
    });
  }

  onChangeProsecutorName(e) {
    this.setState({
      prosecutor_name: e.target.value,
    });
  }

  onChangeStartDate(date) {
    this.setState({
      start_date: date,
    });
  }
  onChangeEndDate(date) {
    this.setState({
      end_date: date,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  onChangeSummary(e, sIndex) {
    const { summaries } = this.state;
    summaries[sIndex].summary = e.target.value;
    this.setState({ summaries });
  }

  onChangeHearingDate(date, sIndex) {
    const { summaries } = this.state;
    summaries[sIndex].hearingDate = date;
    this.setState({ summaries });
  }

  addSummary() {
    const { summaries } = this.state;
    summaries.push({ summary: "", hearingDate: new Date() });
    this.setState({ summaries });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      def_name: this.state.def_name,
      def_addr: this.state.def_addr,
      crime_type: this.state.crime_type,
      crime_date: this.state.crime_date,
      crime_location: this.state.crime_location,
      ao_name: this.state.ao_name,
      arrest_date: this.state.arrest_date,
      judge_name: this.state.judge_name,
      lawyer_name: this.state.lawyer_name,
      prosecutor_name: this.state.prosecutor_name,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      status: this.state.status,
      summaries: this.state.summaries,
    };

    const id = this.props.match.params.id;
    // console.log(exercise, id);

    customFetch
      .post("/exercises/update/" + id, exercise)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    window.location = "/caseList";
  }

  render() {
    return (
      <div className="update_form">
        <h2 style={{ margin: "1em 0" }}>Update Case</h2>
        <form onSubmit={this.onSubmit} style={{ width: "45%" }}>
          <div className="form-group">
            <label htmlFor="def_name">Defandant's name: </label>
            <input
              id="def_name"
              type="text"
              required
              className="form-control"
              value={this.state.def_name}
              onChange={this.onChangeDefName}
            />
          </div>
          <div className="form-group">
            <label>Defandant's address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.def_addr}
              onChange={this.onChangeDefAddr}
            />
          </div>
          <div className="form-group">
            <label>Crime type: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.crime_type}
              onChange={this.onChangeCrimeType}
            />
          </div>
          <div className="form-group">
            <label htmlFor="crime_date">Crime Date:</label>
            <DatePicker
              id="crime_date"
              selected={this.state.crime_date}
              onChange={this.onChangeCrimeDate}
            />
          </div>
          <div className="form-group">
            <label>Crime Location: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.crime_location}
              onChange={this.onChangeCrimeLoc}
            />
          </div>
          <div className="form-group">
            <label>Arresting Officer name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.ao_name}
              onChange={this.onChangeAoName}
            />
          </div>
          <div className="form-group">
            <label>Arrest Date:</label>
            <DatePicker
              selected={this.state.arrest_date}
              onChange={this.onChangeArrestDate}
            />
          </div>
          <div className="form-group">
            <label>Judge Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.judge_name}
              onChange={this.onChangeJudgeName}
            />
          </div>
          <div className="form-group">
            <label>Lawyer Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.lawyer_name}
              onChange={this.onChangeLawyerName}
            />
          </div>
          <div className="form-group">
            <label>Prosecutor Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.prosecutor_name}
              onChange={this.onChangeProsecutorName}
            />
          </div>
          <div className="form-group">
            <label>Start Date: </label>
            <DatePicker
              selected={this.state.start_date}
              onChange={this.onChangeStartDate}
            />
          </div>
          <div className="form-group">
            <label>End Date: </label>
            <DatePicker
              selected={this.state.end_date}
              onChange={this.onChangeEndDate}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
            />
          </div>
          {this.state.summaries.map((summary, sIndex) => (
            <div key={sIndex}>
              <div className="form-group">
                <label>Summary {sIndex + 1}: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={summary.summary}
                  onChange={(e) => this.onChangeSummary(e, sIndex)}
                />
              </div>
              <div className="form-group">
                <label>Hearing Date {sIndex + 1}: </label>
                <DatePicker
                  selected={new Date(summary.hearingDate)}
                  onChange={(date) => this.onChangeHearingDate(date, sIndex)}
                />
              </div>
            </div>
          ))}
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.addSummary}
              style={{ margin: "1em 0" }}
            >
              Add Summary
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "1em 0" }}
            >
              Update case
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(UpdateCase);
