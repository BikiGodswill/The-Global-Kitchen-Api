require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const PORT = process.env.PORT || 3000;
const app = express();



async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
    );
  });
}
startServer();
module.exports = app;
