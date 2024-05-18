import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import CalenderComponent from "./Calender";

export default class CreateCase extends Component {
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
      next_hearing: new Date(),
      hearing_slot: 1,
      next_nearest_date: null,
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
    this.onChangeNextHearing = this.onChangeNextHearing.bind(this);
    this.onUpdateNextHearingDate = this.onUpdateNextHearingDate.bind(this);
    this.onSlotUpdate = this.onSlotUpdate.bind(this);
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

  onChangeNextHearing(date) {
    this.setState({
      next_hearing: date,
    });
  }

  onSlotUpdate(e) {
    this.setState({
      hearing_slot: e.target.value,
    });
  }

  onUpdateNextHearingDate(date) {
    this.setState({
      next_nearest_date: date,
    });
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
      next_hearing: this.state.next_hearing,
      hearing_slot: this.state.hearing_slot,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => {
        console.log(res.data);
        alert("Case added successfully");
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          alert("Only a registrar can create a case.");
        } else {
          alert("An error occurred while adding the case.");
        }
      });

    this.setState({
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
      end_date: null,
      status: "",
      summaries: [{ summary: "", hearings: [{ date: new Date() }] }],
    });

    // window.location = '/create';
    this.case_created = true;
  }

  render() {
    return (
      <div className="update_form">
        <h3 style={{ margin: "1em 0" }}>Enter The Case Details</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="form-group" style={{ width: "60%" }}>
                <label>Defandant's name: </label>
                <input
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
                <label>Crime Date:</label>
                <DatePicker
                  selected={this.state.crime_date}
                  onChange={this.onChangeCrimeDate}
                  maxDate={new Date()}
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
                  minDate={this.state.crime_date}
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
                  minDate={this.state.crime_date}
                />
              </div>
              <div className="form-group">
                <label>Expected end Date: </label>
                <DatePicker
                  selected={this.state.end_date}
                  onChange={this.onChangeEndDate}
                  minDate={this.state.start_date}
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
              <div className="form-group">
                <label>Next Hearing date: </label>
                <DatePicker
                  selected={this.state.next_hearing}
                  onChange={this.onChangeNextHearing}
                  minDate={this.state.start_date}
                />

                {this.state.next_nearest_date && (
                  <span>( {this.state.next_nearest_date} )</span>
                )}
              </div>
              <div className="form-group">
                <label>Next Hearing Slot: </label>
                <select
                  class="form-select"
                  aria-label="Hearing select"
                  onChange={this.onSlotUpdate}
                >
                  <option value={1}>Slot 1 :: 10:00 AM to 12:00 PM</option>
                  <option value={2}>Slot 2 :: 2:00 PM to 4:00 PM</option>
                </select>
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
                    <label>
                      Hearing Date {sIndex + 1}:{" "}
                      <DatePicker
                        selected={summary.hearingDate}
                        onChange={(date) =>
                          this.onChangeHearingDate(date, sIndex)
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.addSummary}
              >
                Add Summary
              </button>
            </div>
            <div style={{ width: "40%" }}>
              <CalenderComponent
                updateNextHearingDate={this.onUpdateNextHearingDate}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2em",
            }}
          >
            <input type="submit" className="btn" value="Create Case" />
            {this.case_created && (
              <>
                <redirect to="/caseList" />
              </>
            )}
          </div>
        </form>
      </div>
    );
  }
}
