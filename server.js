const express = require("express");
const mongoose = require("mongoose");

// create express app
const app = express();

// express middleware to handle JSON requests
app.use(express.json());

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix") // remember to change database NAME (e.g. netflix) for new project
  // show if successfully connected
  .then(() => {
    console.log("MongoDB connected");
  })
  // show if error
  .catch((error) => {
    console.log(error);
  });

// routes
// import movie/show routers
const movieRouter = require("./routes/movie");
const showRouter = require("./routes/show");

// define paths // app.use([path], [router]);
app.use("/movies", movieRouter);
app.use("/shows", showRouter);

// start server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
