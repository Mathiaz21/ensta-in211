import React from 'react'
import "./Movie.css"


export const Movie = (props) => {
  return (
    <div className='posterDiv'>
      <div className="description">
          <p>{props.title}</p>
          <p>Sortie : {props.date}</p>
      </div>
      <img src={"https://image.tmdb.org/t/p/w300/" + props.poster} className='poster'/>
    </div>
  )
}
