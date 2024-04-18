const express = require("express");

// create express router for movie
const router = express.Router();

// load model
const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    console.log(req);
    const genre = req.query.genre;
    const rating = req.query.rating;

    let movies = [];
    if (genre) {
      movies = await Movie.find({ genre: genre });
    } else if (rating) {
      movies = await Movie.find({ rating: { $gt: rating } });
    } else {
      movies = await Movie.find();
    }
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // const movie = await Movie.findOne({ _id: req.params.id });
    const movie = await Movie.findById({ _id: req.params.id });
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// export default (i.e. movie in this case) router
module.exports = router;
