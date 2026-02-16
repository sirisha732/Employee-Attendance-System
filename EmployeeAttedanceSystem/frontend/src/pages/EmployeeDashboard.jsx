import { useEffect, useState } from "react";
import api from "../api";

export default function EmployeeDashboard() {
  const [todayStatus, setTodayStatus] = useState("Not Checked In");
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    late: 0,
    hours: 0
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    // Get all employee attendance
    const res = await api.get("/attendance/my-history");
    const data = res.data;

    const today = new Date().toISOString().slice(0, 10);

    let present = 0, absent = 0, late = 0, hours = 0;

    data.forEach(d => {
      if (d.status === "present") present++;
      if (d.status === "absent") absent++;
      if (d.status === "late") late++;
      hours += d.totalHours || 0;

      if (d.date === today) setTodayStatus("Checked In");
    });

    setSummary({ present, absent, late, hours });
    setRecent(data.slice(-7).reverse());
  };

  const checkIn = async () => {
    await api.post("/attendance/checkin");
    loadDashboard();
  };

  const checkOut = async () => {
    await api.post("/attendance/checkout");
    loadDashboard();
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <h3>Today's Status: {todayStatus}</h3>

      <div>
        <p>Present: {summary.present}</p>
        <p>Absent: {summary.absent}</p>
        <p>Late: {summary.late}</p>
        <p>Total Hours: {summary.hours}</p>
      </div>

      <button onClick={checkIn}>Check In</button>
      <button onClick={checkOut}>Check Out</button>

      <h3>Recent Attendance (Last 7 Days)</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Check-In</th>
            <th>Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {recent.map(r => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>{r.checkInTime || "-"}</td>
              <td>{r.checkOutTime || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
