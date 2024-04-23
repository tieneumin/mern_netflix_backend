const Show = require("../models/show");

// read
const getShows = async (genre, rating, premiere_year) => {
  try {
    let filters = {};
    if (genre) {
      filters.genre = genre;
    }
    if (rating) {
      filters.rating = { $gt: rating };
    }
    if (premiere_year) {
      filters.premiere_year = { $gt: premiere_year };
    }
    // console.log(filters);
    return await Show.find(filters);
  } catch (error) {
    throw new Error(error);
  }
};

// create
const addShow = async (
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  try {
    const addedShow = new Show({
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    });
    await addedShow.save();
    return addedShow;
  } catch (error) {
    throw new Error(error);
  }
};

// update
const updateShow = async (
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  try {
    return await Show.findByIdAndUpdate(
      id,
      {
        title,
        creator,
        premiere_year,
        end_year,
        seasons,
        genre,
        rating,
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getShows,
  addShow,
  updateShow,
};
