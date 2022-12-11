import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
// @ts-ignore
import { setMoviesSearchQuery } from "../redux/actions.tsx";
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Movie from "./Movie.tsx";

type Props = {};

const MoviesContainer: React.FC<Props> = (props: Props) => {
  const [items, setItems] = React.useState<any>([]);
  const { moviesSearchQuery } = useSelector((state: RootState) => state);
  const [loading, setLoading] = React.useState(true);

  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setMoviesSearchQuery(e));
  };

  React.useEffect(() => {
    if (moviesSearchQuery.length >= 3) {
      setTimeout(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US&page=1&include_adult=false&query=${moviesSearchQuery}`
          )
          .then((response) => {
            setItems(response.data.results.slice(0, 10));
            setLoading(false)
          });
      }, 1000);
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US&page=1`
        )
        .then((response) => {
          setItems(response.data.results.slice(0, 10));
          setLoading(false)
        });
    }
    
  }, [moviesSearchQuery]);

  return (
    <div>
      <Header />
      <input
        placeholder="search"
        value={moviesSearchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
        autoFocus
      />
      {loading ? (
        <div className="container">
          <p className="item">Loading ...</p>
        </div>
      ) : (
        <div className="container">
          {items.length ? (
            items.map((item) => <Movie movie={item} key={item.id}/>)
          ) : (
            <p className="item">No results.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesContainer;
