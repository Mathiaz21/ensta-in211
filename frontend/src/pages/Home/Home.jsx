import logo from './logo.svg';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '../../components/Movie/Movie';


function Home() {
  const [movieName, setMovieName] = useState("")
  const [movies, setMovies] = useState([]);

  useEffect(() =>{
    axios
      .get( movieName==="" ?
        `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a` 
        :"https://api.themoviedb.org/3/search/movie?api_key=522d421671cf75c2cba341597d86403a",{
          params:{
            query: movieName
          }
        }
        )
      .then((response) => {
        setMovies(response.data.results)
        console.log(response.data.results)
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
  });
  }, [movieName])

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {movieName===""?"Entrez un titre de film":movieName}
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <input
          className='searchBar'
          type="text"
          onChange={(event) => { setMovieName(event.target.value) }}
        />
        <h2>{movieName===""?"Films Populaires du moment :":"Résultats de recherche :"}</h2>
        <div className="movieTab">
          {movies.map((movie, index) => (
            <Movie key={index} title={movie.original_title} date={movie.release_date} poster={movie.poster_path}/>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Home;
