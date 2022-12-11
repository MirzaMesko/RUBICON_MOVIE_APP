import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

type Props = {};

const ShowDetails = (props: Props) => {
  const { id } = useParams();
  const [show, setShow] = React.useState<any>({});
  const [reviews, setReviews] = React.useState<any>({});

  const image = show.backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${show.backdrop_path}`
    : show.poster_path
    ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
    : "https://i0.wp.com/www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg";

  React.useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US`
      )
      .then((response) => {
        setShow(response.data);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US&page=1`
      )
      .then((response) => {
        setReviews(response.data.results);
      });
  }, [id]);

  return (
    <div style={{ padding: 100 }}>
      <NavLink to={"/tv"} className="Header-link">
        {"< Back"}
      </NavLink>
      <div className="details">
        {show.video ? (
          <video
            src={`https://api.themoviedb.org/3/tv/${id}/videos?api_key=<<api_key>>&language=en-US`}
            autoPlay
          />
        ) : (
          <img
            src={image}
            alt=""
            className="image"
          />
        )}

        <p className="title">{show.name}</p>
        <div className="info-container">
          <p className="info">Year: {show.release_date?.slice(0, 4)}</p>
          <p className="info">Runtime: {show.runtime} mins</p>
          <p className="info">Rating: {show.vote_average?.toFixed(1)}</p>
          <NavLink
            to={`/reviews/${id}/tv/${show.name}`}
            style={{ textDecoration: "none" }}
          >
            <p className="info">Reviews ({reviews.length})</p>
          </NavLink>
        </div>
        <p>{show.overview}</p>
      </div>
    </div>
  );
};

export default ShowDetails;
