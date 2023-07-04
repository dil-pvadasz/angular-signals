import { Route } from '@angular/router';
import { SignalDemoComponent } from './basic/signal-demo/signal-demo.component';
import { RxComponent } from './rx/rx/rx.component';
import { MoviesComponent } from './store/movies/movies.component';

export const routes: Route[] = [
  { path: 'demo', component: SignalDemoComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'rx', component: RxComponent },
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
];
