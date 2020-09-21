import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
  },
  reducers: {
    createMovie: (state, action) => {
      state.movies.push(action.payload)
    },
    editMovieById: (state, action) => {
      const { id, ...fields } = action.payload
      const { movies } = state

      const movieIndex = state.movies.findIndex(e => e.id === id)
      const movie = movies[movieIndex]

      movies[movieIndex] = { ...movie, ...fields }
    },
    removeMovieById: (state, action) => {
      const id = action.payload 

      state.movies = state.movies.filter(e => e.id !== id)
    },
  },
});

export const { createMovie, editMovieById, removeMovieById } = movieSlice.actions;

export const selectMovie = state => state.movie.movies;

export default movieSlice.reducer;
