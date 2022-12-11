import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
// @ts-ignore
import Review from "./Review.tsx";

const ReviewsContainer: React.FC = () => {
  const { id, content } = useParams();
  const [item, setItem] = React.useState<any>({});
  const [reviews, setReviews] = React.useState<any>({});

  const image = item.backdrop_path
  ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
  : item.poster_path
  ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
  : "https://i0.wp.com/www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg";

  React.useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${content}/${id}?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US`
      )
      .then((response) => {
        setItem(response.data);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/${content}/${id}/reviews?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US&page=1`
      )
      .then((response) => {
        setReviews(response.data.results);
      });
  }, [id, content]);

  return (
    <div style={{ padding: 100 }}>
      <NavLink to={`/${content}/${id}`} className="Header-link">
        {"< Back"}
      </NavLink>
      <div className="details">
        {item.video ? (
          <video
            src={`https://api.themoviedb.org/3/${content}/${id}/videos?api_key=<<api_key>>&language=en-US`}
            autoPlay
          />
        ) : (
          <img
            src={image}
            alt=""
            className="image"
          />
        )}

        <p className="title">
          {item.original_title}
          {item.name}
        </p>
        {reviews.length ? (
          reviews.map((review) => <Review review={review} key={review.id}/>)
        ) : (
          <p className="item">Be the first to review.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsContainer;
