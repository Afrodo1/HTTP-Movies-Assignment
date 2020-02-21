import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovies from "./components/updateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />      
      <Route
        //Route added at path '/update-movie/:id'
        path="/update-movie/:id"
        //Renders UpdateMovies component passing down the props of react router:
        //props.match
        //props.history
        //props.location
        render={props => {
          return <UpdateMovies {...props} list = {savedList} updateList = {setSavedList} />;
        }}
      />
    </>
  );
};

export default App;
