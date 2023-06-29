import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, of } from 'rxjs';
import {
  loadMovies,
  loadMoviesFailed,
  loadMoviesSucceeded,
} from './movie.action';
import { MovieService } from './movie.service';

@Injectable()
export class MoviesEffects {
  public loadMovies = createEffect(() =>
    this.actions.pipe(
      ofType(loadMovies),
      switchMap(() =>
        this.movieService.getMovies().pipe(
          map((movies) => loadMoviesSucceeded({ movies })),
          catchError((_) => of(loadMoviesFailed()))
        )
      )
    )
  );

  constructor(private actions: Actions, private movieService: MovieService) {}
}
