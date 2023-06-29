import { createReducer, on } from '@ngrx/store/';
import { Movie } from './movie';
import { loadMovies, loadMoviesSucceeded } from './movie.action';

export enum LoadingState {
  Initial,
  Loading,
  Loaded,
}

export interface MovieState {
  movies: Movie[];
  loadingState: { [key: string]: LoadingState };
}

export const initialState: MovieState = {
  movies: [],
  loadingState: {
    movies: LoadingState.Initial,
  },
};

export const moviesReducer = createReducer(
  initialState,
  on(loadMovies, (state) => ({
    ...state,
    movies: [],
    loadingState: { ...state.loadingState, movies: LoadingState.Loading },
  })),
  on(loadMoviesSucceeded, (state, { movies }) => ({
    ...state,
    movies: movies,
    loadingState: { ...state.loadingState, movies: LoadingState.Loaded },
  }))
);

export const rootReducer = {
  movies: moviesReducer,
};
