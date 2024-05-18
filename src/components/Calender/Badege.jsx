import { styled } from "@mui/material";

const Wrapper = styled("div")`
  background-color: #cfdaef;
  color: black; 
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 50px;
  height: 20px;
  text-align: center;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: small;
  font-weight: bold;
  display: none;
`;

const CountBadge = ({ count }) => <Wrapper className="count-badge">{count} slots</Wrapper>;

export default CountBadge;
