// load model
const Movie = require("../models/movie");

// read
const getMovies = async (genre, rating) => {
  try {
    let movies = [];
    if (genre) {
      movies = await Movie.find({ genre: genre });
    } else if (rating) {
      movies = await Movie.find({ rating: { $gt: rating } });
    } else {
      movies = await Movie.find();
    }
    return movies;
  } catch (error) {
    throw new Error(error); // native JS error class
  }
};

// create
const addMovie = async (title, director, release_year, genre, rating) => {
  // create new movie
  const newMovie = new Movie({
    title,
    director,
    release_year,
    genre,
    rating,
  });
  // save movie to MongoDB
  await newMovie.save();
  return newMovie;
};

// update
const updateMovie = async (
  movie_id,
  title,
  director,
  release_year,
  genre,
  rating
) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    // findByIdAndUpdate(id, {updateObject}, options); https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
    movie_id,
    {
      title,
      director,
      release_year,
      genre,
      rating,
    },
    { new: true } // send updated data; without this, old data is resent i.e. update doesn't happen
  );
  return updatedMovie;
};

module.exports = {
  getMovies,
  addMovie,
  updateMovie,
};
