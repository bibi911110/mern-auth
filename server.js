//env should be always all the way on the top
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//ConnectDB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler should be the last at middlewares
app.use(errorHandler);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged Error: ${err}`);
  server.close(() => process.exit(1));
});
