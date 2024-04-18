const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// set up schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  director: String,
  releaseYear: String,
  genre: String,
  rating: Number,
});

// convert schema to model
const Movie = model("Movie", movieSchema);
module.exports = Movie;
