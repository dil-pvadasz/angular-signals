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

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    MovieService,
    provideRouter(routes),
    /*provideStore(),
    provideState({ movies: moviesReducer }),*/
    importProvidersFrom(
      StoreModule.forRoot(rootReducer),
      EffectsModule.forRoot(MoviesEffects)
    ),
  ],
});
