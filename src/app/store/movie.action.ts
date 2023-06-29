import { createAction, props } from '@ngrx/store';
import { Movie } from './movie';

export const loadMovies = createAction('[Movies] Load');
export const loadMoviesSucceeded = createAction(
  '[Movies] Loaded',
  props<{ movies: Movie[] }>()
);
export const loadMoviesFailed = createAction('[Movies] Failed');
