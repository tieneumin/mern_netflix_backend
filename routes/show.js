const express = require("express");
const { getShows, addShow, updateShow } = require("../controllers/show");
const Show = require("../models/show");

const router = express.Router();

// read
router.get("/", async (req, res) => {
  const { genre, rating, premiere_year } = req.query;
  try {
    // console.log(req);
    res.status(200).send(await getShows(genre, rating, premiere_year));
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// read by id
router.get("/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    res.status(200).send(await Show.findById({ _id: req.params.id }));
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// create
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { title, creator, premiere_year, end_year, seasons, genre, rating } =
      req.body;
    res
      .status(200)
      .send(
        await addShow(
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const { title, creator, premiere_year, end_year, seasons, genre, rating } =
      req.body;
    res.status(200).send(
      await updateShow(
        req.params.id, // undefined if absent
        title,
        creator,
        premiere_year,
        end_year,
        seasons,
        genre,
        rating
      )
    );
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.id);
    res.status(200).send("Show successfully deleted.");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// export router
module.exports = router;
