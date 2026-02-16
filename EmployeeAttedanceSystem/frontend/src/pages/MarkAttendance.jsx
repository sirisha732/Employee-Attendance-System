import api from "../api";

export default function MarkAttendance() {
  return (
    <>
      <button onClick={() => api.post("/attendance/checkin")}>Check In</button>
      <button onClick={() => api.post("/attendance/checkout")}>Check Out</button>
    </>
  );
}
