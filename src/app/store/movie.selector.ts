import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingState, MovieState } from './movie.reducer';

export const selectMovies = createFeatureSelector<MovieState>('movies');

export const selectMoviesList = createSelector(
  selectMovies,
  (movies) => movies.movies
);

export const selectMoviesLoading = createSelector(
  selectMovies,
  (movies) => movies.loadingState.movies === LoadingState.Loading
);
