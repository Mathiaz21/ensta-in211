import express from "express";
import { appDataSource } from '../datasource.js';
import Movie from "../entities/movies.js";
import axios from 'axios';



const router = express.Router();

router.get("/", (req, res)=> {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
})

router.post("/new", (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    date: req.body.date,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
      console.log("Movie posted")
    })
    .catch(function (error) {
      console.error(error);
      {
        res.status(500).json({ message: 'Error while creating the movie' });
      }
    });
})

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

router.get('/script', (req,res)=>{
  axios
  .get(`https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a`)
  .then((response) => {
    if(response.data.results){
      const movieRepository = appDataSource.getRepository(Movie);
      const movieData = response.data.results.map( (movie) => {
        const newMovie = movieRepository.create({
          title: movie.title,
          description: movie.overview,
          imageUrl: movie.poster_path,
          date: movie.release_date,
        });
        moviePromises = movieData.map( async (newMovie) => {
          return  movieRepository
          .insert(newMovie)
          .catch(function (error) {
            console.error(error);
            {
              res.status(500).json({ message: 'Error while creating the movie' });
            }
          })
        })
        return Promise.all(moviePromises);
    })
  }
  
  res.status(200).json({ message: "C'est carré !"})
})
  .catch( (e) => console.log(e) 
  )
})
    
export default router;