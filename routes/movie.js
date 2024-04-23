const express = require("express");
const { getMovies, addMovie, updateMovie } = require("../controllers/movie");

// create movie express router
const router = express.Router();

// load model
const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  // // original fx
  // try {
  //   console.log(req);
  //   const genre = req.query.genre;
  //   const rating = req.query.rating;

  //   let movies = [];
  //   if (genre) {
  //     movies = await Movie.find({ genre: genre });
  //   } else if (rating) {
  //     movies = await Movie.find({ rating: { $gt: rating } });
  //   } else {
  //     movies = await Movie.find();
  //   }
  //   res.status(200).send(movies);
  //   const movies = await getMovies();
  // } catch (error) {
  //   res.status(400).send({
  //     message: error.message,
  //   });
  // }

  // controller fx
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const movies = await getMovies(genre, rating);
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

/*
  CRUD | REST API
  C - create | POST
  R - read | GET
  U - update | PUT / PATCH
  D - delete | DELETE
*/

/* 
  create (addMovie)
  POST method URL syntax: http://localhost:5000/movies
*/
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const newMovie = await addMovie(
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(newMovie);
    // res.status(200).send("ok");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

/* 
  update (updateMovie) 
  PUT method URL syntax: http://localhost:5000/movies/:id
*/
router.put("/:id", async (req, res) => {
  try {
    const movie_id = req.params.id;
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const updatedMovie = await updateMovie(
      movie_id,
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

/* 
  deleteMovie route
  DELETE method URL syntax: http://localhost:5000/movies/:id
*/
router.delete("/:id", async (req, res) => {
  try {
    const movie_id = req.params.id;
    await Movie.findByIdAndDelete(movie_id);
    res.status(200).send("Movie successfully deleted.");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// export default (i.e. movie in this case) router
module.exports = router;
