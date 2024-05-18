import { useEffect, useState } from "react";
import Calender from "react-calendar";
import moment from "moment";
import customFetch from "../../utils/axios";
import "react-calendar/dist/Calendar.css";
import CountBadge from "./Badege";

const slots = [
  { slot: 1, time: "10:00 AM to 12:00 PM" },
  { slot: 2, time: "2:00 PM to 4:00 PM" },
];

const CalenderComponent = ({ updateNextHearingDate }) => {
  const [val, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [emptySlots, setEmptySlots] = useState({});
  useEffect(() => {
    const fetchEmptySlots = async () => {
      try {
        setLoading(true);
        const { data } = await customFetch.get(`/exercises/emptyslots`);
        setLoading(false);
        let first = true;
        for (let key in data) {
          if (data[key].length > 0 && first)
            updateNextHearingDate(
              `Slot ${data[key][0]} on ${moment(key).format("Do MMMM")}`
            );
          first = false;
        }
        setEmptySlots(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchEmptySlots();
  }, []);

  const tileContent = ({ date, view }) => {
    const formatedDate = moment(date).format("YYYY-MM-DD");
    if (view !== "month") return null;
    const numberOfEmptySlots = emptySlots[formatedDate]?.length;
    return <CountBadge count={numberOfEmptySlots} />;
  };
  const tileClassName = ({ date, view }) => {
    const formatedDate = moment(date).format("YYYY-MM-DD");
    if (view !== "month") return null;
    const numberOfEmptySlots = emptySlots[formatedDate]?.length;
    if (numberOfEmptySlots > 0) return "slotCalenderDay";
    return "";
  };
  const curr = new Date();
  console.log("x = ", val, emptySlots);
  return (
    <div className="calender-wrapper">
      <h2>Vacant Slots</h2>
      <Calender
        value={val}
        onChange={setDate}
        tileContent={tileContent}
        tileClassName={tileClassName}
        maxDetail="month"
        maxDate={new Date(curr.getFullYear(), curr.getMonth() + 2, 1)}
        minDate={curr}
      />
      <div style={{ marginTop: "1em" }}>
        <h5 style={{ color: "purple" }}>
          Empty Slots on {moment(val).format("Do MMMM YYYY")}
        </h5>
        {loading && <p>Loading...</p>}

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {emptySlots[moment(val).format("YYYY-MM-DD")]?.map((x) => (
            <li key={x}>
              <span style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                Slot {x} :
              </span>{" "}
              {slots.find((y) => y.slot === x).time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalenderComponent;
