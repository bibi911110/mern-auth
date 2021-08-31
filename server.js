require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");

//ConnectDB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged Error: ${err}`);
  server.close(() => process.exit(1));
});
