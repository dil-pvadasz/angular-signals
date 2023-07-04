import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Signal } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Movie } from '../movie';
import { changeRating, loadMovies } from '../movie.action';
import { LoadingState } from '../movie.reducer';
import { selectMoviesList, selectMoviesLoading } from '../movie.selector';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  standalone: true,
  imports: [CommonModule, StoreModule],
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  constructor(private store: Store) {}

  public movies: Signal<Movie[]> = signal([]);
  public loading: Signal<boolean> = signal(false);

  ngOnInit() {
    this.store.dispatch(loadMovies());
    this.loading = this.store.selectSignal(selectMoviesLoading);
    this.movies = this.store.selectSignal(selectMoviesList);
  }

  public rate(event: any, movie: Movie) {
    this.store.dispatch(
      changeRating({
        payload: { title: movie.title!, rating: event.target.value },
      })
    );
  }
}
