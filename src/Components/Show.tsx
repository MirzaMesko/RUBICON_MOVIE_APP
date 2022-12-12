import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  show: {
    id: string;
    backdrop_path?: string;
    poster_path?: string;
    name: string;
  };
};

const Show: React.FC<Props> = ({ show }: Props) => {
  const image = show.backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${show.backdrop_path}`
    : show.poster_path
    ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
    : "https://i0.wp.com/www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg";
  return (
    <div className="item" key={show.id}>
      <NavLink to={`/tv/${show.id}`} className="App-link" data-testid="link">
        <img src={image} alt="" className="image" data-testid="image" />
        <p className="title" data-testid="title">
          {show.name}
        </p>
      </NavLink>
    </div>
  );
};

export default Show;
