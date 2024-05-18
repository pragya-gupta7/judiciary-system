import Box from "@mui/material/Box";
import moment from "moment";

const ShowField = ({ label, value, type = "text", size = "large" }) => {
  let displayValue = value;
  if (type === "date") displayValue = moment(value).format("Do MMM YY");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        mx: 1,
        my: 1,
        fontSize: size === "large" ? "1.25em" : "1em",
      }}
    >
      <Box sx={{ fontWeight: "bold", mr: 2 }}>{label} :</Box>
      <Box>{displayValue}</Box>
    </Box>
  );
};

export default ShowField;
