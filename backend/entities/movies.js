import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',  
      type: String,
    },
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    date: { type: Date }
  },
});

export default Movie;