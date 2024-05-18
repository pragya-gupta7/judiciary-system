import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import customFetch from "../../utils/axios";
import DatePicker from "react-datepicker";
import CircularProgress from "@mui/material/CircularProgress";
import { Exercise } from "../../components/exercises-list.component";

const defaultFielters = {
  starting_date: "",
  ending_date: "",
  hearing_date: "",
  cin: "",
  keyword: "",
};

const SearchPage = () => {
  const [filterOptions, setFielterOptions] = useState(defaultFielters);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPapers = async () => {
    setLoading(true);
    const { data } = await customFetch.post("/exercises/search", filterOptions);
    setLoading(false);
    setData(data);
  };
  const updateField = (date, field) => {
    setFielterOptions((prev) => ({ ...prev, [field]: date }));
  };
  return (
    <Box sx={{ display: "flex", gap: "2em", p: "1em" }}>
      <Box
        component="aside"
        className="search-options"
        sx={{
          border: "1px solid #a9a7a7",
          borderRadius: "10px",
          boxShadow: "rgba(177, 177, 177, 0.15) 1.95px 1.95px 2.6px",
          p: "1em",
          width: "250px",
          display: "flex",
          gap: "1em",
          flexDirection: "column",
          "& label": {
            width: "100px",
            display: "flex",
            gap: "1em",
          },
        }}
      >
        <Typography variant="h6">Search Options</Typography>
        <label>
          Starting Date
          <DatePicker
            selected={filterOptions.starting_date}
            onChange={(date) => updateField(date, "starting_date")}
            className="date-picker"
          />
        </label>
        <label>
          Ending Date
          <DatePicker
            selected={filterOptions.ending_date}
            onChange={(date) => updateField(date, "ending_date")}
            className="date-picker"
          />
        </label>
        <label>
          Hearing date &nbsp;&nbsp;
          <DatePicker
            selected={filterOptions.hearing_date}
            onChange={(date) => updateField(date, "hearing_date")}
            className="date-picker"
          />
        </label>
        <Box>
          <TextField
            label="CIN number"
            variant="outlined"
            name="cin"
            value={filterOptions.cin}
            onChange={(e) => updateField(e.target.value, "cin")}
            fullWidth
            type="text"
            size="small"
          />
        </Box>
        <Box>
          <TextField
            label="Keyword"
            variant="outlined"
            name="keyword"
            value={filterOptions.keyword}
            onChange={(e) => updateField(e.target.value, "keyword")}
            fullWidth
            type="text"
            size="small"
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-around", mt: "1em" }}
        >
          <Button variant="contained" onClick={fetchPapers}>
            Search
          </Button>
        </Box>
      </Box>
      <Box component="section" className="search-results">
        <Typography variant="h4">Search Results</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            <div style={{ margin: "1em 0.5em" }}>
              <h2>Cases</h2>
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
                <tbody>
                  {data.map((item) => (
                    <Exercise exercise={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
