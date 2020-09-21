import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './routes/movies/movieSlice';
import inningReducer from './routes/inning/inningSlice'

export default configureStore({
  reducer: {
    movie: movieReducer,
    inning: inningReducer
  },
});
