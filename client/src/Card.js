import "./card.css";
const Card = ({ movie }) => {
  return (
    <div className="box">
      <h1>{movie.title}</h1>
      <h3>Length: {movie.length}</h3>
      <h3>Rating: {movie.rating}</h3>
      <h3>Genre: {movie.genre[0]}</h3>
    </div>
  );
};

export default Card;
