const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/dashboard", require("./routes/dashboard"));

app.listen(5000, () => console.log("Server running on 5000"));
