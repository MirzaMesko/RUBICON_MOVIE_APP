import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState<any>({});
  const [reviews, setReviews] = React.useState<any>({});

  const image = movie.backdrop_path
  ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
  : movie.poster_path
  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  : "https://i0.wp.com/www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg";

  React.useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US`
      )
      .then((response) => {
        setMovie(response.data);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US&page=1`
      )
      .then((response) => {
        setReviews(response.data.results);
      });
  }, [id]);

  return (
    <div style={{ padding: 100 }}>
      <NavLink to={"/movies"} className="Header-link">
        {"< Back"}
      </NavLink>
      <div className="details">
        {movie.video ? (
          <video
            src={`https://api.themoviedb.org/3/movie/${id}/videos?api_key=<<api_key>>&language=en-US`}
            autoPlay
          />
        ) : (
          <img
            src={image}
            alt=""
            className="image"
          />
        )}

        <p className="title">{movie.original_title}</p>
        <div className="info-container">
          <p className="info">Year: {movie.release_date?.slice(0, 4)}</p>
          <p className="info">Runtime: {movie.runtime} mins</p>
          <p className="info">Rating: {movie.vote_average?.toFixed(1)}</p>
          <NavLink
            to={`/reviews/${id}/movie/${movie.original_title}`}
            style={{ textDecoration: "none" }}
          >
            <p className="info">Reviews ({reviews.length})</p>
          </NavLink>
        </div>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
