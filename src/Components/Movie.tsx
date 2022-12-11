import React from 'react';
import { NavLink } from "react-router-dom";

type Props = {
    movie: {
        id: string;
        backdrop_path?: string;
        poster_path?: string;
        original_title: string
    };
}

const Movie: React.FC<Props> = ({ movie }: Props) => {
  const image = movie.backdrop_path
  ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
  : movie.poster_path
  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  : "https://i0.wp.com/www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg";
  return (
    <div
    className='item'
    key={movie.id}
  >
    <NavLink to={`/movie/${movie.id}`} className="App-link">
      <img
        src={image}
        alt=""
        className="image"
      />
      <p className='title'>
        {movie.original_title}
      </p>
    </NavLink>
  </div>
  )
}

export default Movie;