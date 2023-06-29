import { Route } from '@angular/router';
import { SignalDemoComponent } from './basic/signal-demo/signal-demo.component';
import { MoviesComponent } from './store/movies/movies.component';

export const routes: Route[] = [
  { path: 'demo', component: SignalDemoComponent },
  { path: 'movies', component: MoviesComponent },
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
];
