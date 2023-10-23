import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/axiosConfig";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    // path info appended to the baseURL setting that we create when setting up the configuration for axios
    try {
      const response = await api.get("/api/v1/movies");

      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // when the app component first loads, the getMovies function will exectued
  useEffect(() => {
    getMovies();
  }, []);

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      {/* establish the route mapping */}
      <Routes>
        {/* Outer Route wrapps the all descendants routes and apply the same layout*/}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:yTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
