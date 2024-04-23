const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// set up schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

// convert schema to model
const Movie = model("Movie", movieSchema);
module.exports = Movie;
