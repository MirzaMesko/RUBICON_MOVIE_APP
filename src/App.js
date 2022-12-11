import "./App.css";
import React from "react";
import MoviesContainer from "./Components/MoviesContainer.tsx";
import ShowsContainer from "./Components/ShowsContainer.tsx";
import MovieDetails from "./Components/MovieDetails.tsx";
import ShowDetails from "./Components/ShowDetails.tsx";
import Reviews from "./Components/ReviewsContainer.tsx";
import { Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/movies' element={<MoviesContainer />}/>
        <Route path='/tv' element={<ShowsContainer />}/>
        <Route path='/movie/:id' element={<MovieDetails />}/>
        <Route path='/reviews/:id/:content/:title' element={<Reviews />} />
        <Route path='/tv/:id' element={<ShowDetails />}/>
        <Route path="*" element={<Navigate replace to="/tv" />} />
      </Routes>
    </div>
  );
};

export default App;
