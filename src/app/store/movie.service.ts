import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Movie } from './movie';

export const movies: Movie[] = [
  { title: 'Star Wars IV.', length: 156, rating: 0 },
  { title: 'Harry Potter and the chamber of secrets', length: 143, rating: 0 },
  { title: 'Dr Strange', length: 132, rating: 0 },
];

@Injectable()
export class MovieService {
  constructor() {}

  public getMovies(): Observable<Movie[]> {
    return of(movies).pipe(/*delay(5000)*/);
  }
}
