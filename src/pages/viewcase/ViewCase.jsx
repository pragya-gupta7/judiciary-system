import customFetch from "../../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ShowField from "../../components/ShowField/ShowField";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import moment from "moment";

const ViewCase = () => {
  const { id } = useParams();
  const type = localStorage.getItem("type");
  const [caseData, setCaseData] = useState({});
  console.log(id);
  useEffect(() => {
    const fetchCaseDetail = async () => {
      try {
        const { data } = await customFetch.get(`/exercises/${id}`);
        console.log(data);
        setCaseData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCaseDetail();
  }, []);
  return (
    <Container sx={{ width: "100%" }}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "5em",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", letterSpacing: "2px" }}
        >
          Case Information
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{
              mb: 2,
              px: 2,
              py: 2,
              backgroundColor: "#abc5b2",
              borderRadius: "10px",
              // fontSize: '0.9em'
            }}
          >
            <Grid item xs={12} sm={4}>
              <ShowField
                label="Arresting Officer name"
                value={caseData.ao_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                type="date"
                label="Arrest Date"
                value={caseData.arrest_date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                type="date"
                label="Crime Date"
                value={caseData.crime_date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                label="Crime Location"
                value={caseData.crime_location}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField label="Crime Type" value={caseData.crime_type} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                label="Defandant's address"
                value={caseData.def_addr}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField label="Defandant's name" value={caseData.def_name} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                type="date"
                label="End date"
                value={caseData.end_date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField label="Judge Name" value={caseData.judge_name} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField label="Lawyer Name" value={caseData.lawyer_name} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                label="Prosecutor Name"
                value={caseData.prosecutor_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                type="date"
                label="Start Date"
                value={caseData.start_date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField label="Status" value={caseData.status} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ShowField
                type="date"
                label="Updated At"
                value={caseData.updatedAt}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, p: 4 }}>
            {caseData.summaries &&
              caseData.summaries.map((summary, sIndex) => (
                <div
                  key={sIndex}
                  style={{
                    width: "100%",
                    display: "flex",
                    fontSize: "1.25em",
                    gap: "2em",
                    borderBottom: "1px solid grey",
                    marginBottom: "1em",
                    paddingBottom: "1em",
                  }}
                >
                  <div>
                    <b>Hearing Date:</b>
                    &nbsp;&nbsp;
                    {moment(summary.hearingDate).format("Do MMMM YYYY")}
                  </div>
                  <div>
                    <b>Summary:</b> &nbsp;&nbsp; {summary.summary}
                  </div>
                  <hr />
                </div>
              ))}
          </Grid>
          {type === "Registrar" && (
            <Box sx={{ width: "100%", display: "flex" }}>
              <Link
                style={{
                  color: "white",
                  backgroundColor: "#0000FF",
                  padding: "0.25em 1em",
                  borderRadius: "5px",
                  margin: "1em auto",
                }}
                to={`/update/${id}`}
              >
                Edit
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ViewCase;
