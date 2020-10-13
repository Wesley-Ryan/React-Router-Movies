import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  { Route, Switch } from 'react-router-dom'
import Movie from './Movies/Movie'
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          setMovieList(response.data)
          
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    let movie = movieList.filter((movie) => movie.id === id)
    setSaved(movie)
  };
  console.log("First Data:",movieList)

  return (
    <div>
      <SavedList list={[ /* This is stretch */]} />
      <Route exact path="/">
        <MovieList movies={movieList}/>
      </Route>
      <Route path='/movies/:id'>
        <Movie/>
      </Route>
   
    </div>
  );
}
