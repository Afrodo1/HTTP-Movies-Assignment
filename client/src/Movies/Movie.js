import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";


export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = (id) => {
    //takes in the id of the movie as a parameter
    axios
    //intiates the axios delete at id location
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {              
        console.log("DELETED!", res);
        //sends user back to home page.        
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Delete Spell Missed!", err);
      });
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="save-btn">
          <Link to={`/update-movie/${this.props.match.params.id}`}>Edit</Link>
        </div>
        <div
          className="save-btn"
          onClick={() => {
            this.deleteMovie(this.props.match.params.id);
          }}
        >
          <button>DELETE</button>
        </div>
      </div>
    );
  }
}
