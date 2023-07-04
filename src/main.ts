import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/routes';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { rootReducer } from './app/store/movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './app/store/movie.effects';
import { MovieService } from './app/store/movie.service';
import { FakeService } from './app/rx/fake.service';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <a routerLink="demo">Basic</a>
      <a routerLink="movies">Movies</a>
      <a routerLink="rx">Rx</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`nav a {display: block}`],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    MovieService,
    FakeService,
    provideRouter(routes),
    /*provideStore(),
    provideState({ movies: moviesReducer }),*/
    importProvidersFrom(
      StoreModule.forRoot(rootReducer),
      EffectsModule.forRoot(MoviesEffects)
    ),
  ],
});
