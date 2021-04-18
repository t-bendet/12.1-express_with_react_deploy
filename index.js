const express = require("express");
const path = require('path');

const { getMoviesList, addMovie, getMovie, deleteMovie } = require("./utils");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.use(express.json());
// TODO add status codes and error handling
app.use(cors());

//get all Movies
app.get("/api/movies", (req, res) => {
  res.send(getMoviesList());
});

//Add a movie
app.post("/api/movies", (req, res) => {
  addMovie(req.body);
  res.send("Got a POST request");
});

//get a single movie
app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  res.send(getMovie(id));
});

//Update an existing movie
app.put("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  deleteMovie(id);
  addMovie(req.body);
  res.send("Got a Put request");
});

//Delete an existing movie
app.delete("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  deleteMovie(id);
  res.send("DELETED FOREVER!!!!!!!!");
});

// PORT
app.listen(port, () => {
  console.log("Server is up on port" + port);
});
