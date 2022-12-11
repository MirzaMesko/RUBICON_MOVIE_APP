import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
// @ts-ignore
import { setShowsSearchQuery } from "../redux/actions.tsx";
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Show from "./Show.tsx";

const ShowsContainer: React.FC = () => {
  const [items, setItems] = React.useState<any>([]);
  const { showsSearchQuery } = useSelector((state: RootState) => state);
  const [loading, setLoading] = React.useState(true);

  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setShowsSearchQuery(e));
  };

  React.useEffect(() => {
    if (showsSearchQuery.length >= 3) {
      setTimeout(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/search/tv?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US&page=1&include_adult=false&query=${showsSearchQuery}`
          )
          .then((response) => {
            setItems(response.data.results.slice(0, 10));
            setLoading(false);
          });
      }, 1000);
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=44b57b98c5d43d5544cd9d0e72cc30d0&language=en-US&page=1`
        )
        .then((response) => {
          setItems(response.data.results.slice(0, 10));
          setLoading(false);
        });
    }
  }, [showsSearchQuery]);
  return (
    <>
      <Header />
      <input
        placeholder="search"
        value={showsSearchQuery}
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
            items.map((item) => <Show show={item} key={item.id}/>)
          ) : (
            <p className="item">No results.</p>
          )}
        </div>
      )}
    </>
  );
};

export default ShowsContainer;
