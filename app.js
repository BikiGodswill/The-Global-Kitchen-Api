require("dotenv").config();
const recipeRoutes = require("./src/routes/recipeRoutes");
const express = require("express");
const connectDB = require("./src/config/db");
const globalErrorHandler = require("./src/middlewares/errorHandler");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Check Project Health
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to The Global Kitchen API",
    version: "1.0.0",
    docs: "/api/recipes",
  });
});

// Routes
app.use("/api/recipes", recipeRoutes);

// 404 Error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}, route not found`,
  });
});

//Global Error handler
app.use(globalErrorHandler);

// Start the application
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
