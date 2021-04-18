const fs = require("fs");
const path = require("path");

//getMovieList
const getMoviesList = () => fs.readFileSync("./db/data.json").toString();
//Add Movie(1.get all movies 2.add movie obj 3.write to data base)

const addMovie = (newMovie) => {
  const movieList = JSON.parse(getMoviesList());
  movieList.push(newMovie);
  fs.writeFileSync("./db/data.json", JSON.stringify(movieList));
};

//getMovie(1.get all movies 2.filter by id 3.return movie)
const getMovie = (id) => {
  const movieList = JSON.parse(getMoviesList());
  const movie = movieList.find((el) => {
    return el.id === id;
  });
  return JSON.stringify(movie);
};
//updateMovie
const updateMovie = (id) => {
  const movieList = JSON.parse(getMoviesList());
  const movie = movieList.find((el) => {
    return el.id === id;
  });
  return JSON.stringify(movie);
};

//deleteMovie

const deleteMovie = (id) => {
  const movieList = JSON.parse(getMoviesList());
  const movieIndex = movieList.findIndex((el) => {
    return el.id === id;
  });
  movieList.splice(movieIndex, 1);
  fs.writeFileSync("./db/data.json", JSON.stringify(movieList));
};

exports.getMoviesList = getMoviesList;
exports.addMovie = addMovie;
exports.getMovie = getMovie;
exports.deleteMovie = deleteMovie;
