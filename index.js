const express = require("express");
const path = require("path");
const { getMoviesList, addMovie, getMovie, deleteMovie } = require("./utils");
const app = express();
const cors = require("cors");

app.use(express.json());
const whitelist = ["http://localhost:3000", "http://localhost:8080"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`server listening on port: ${PORT}`);
});
