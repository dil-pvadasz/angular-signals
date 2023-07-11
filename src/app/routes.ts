import { Route } from '@angular/router';
import { DynamicDependencyDemoComponent } from './basic/dynamic-dependency-demo/dynamic-dependency-demo.component';
import { SignalDemoComponent } from './basic/signal-demo/signal-demo.component';
import { RxComponent } from './rx/rx/rx.component';
import { MoviesComponent } from './store/movies/movies.component';

export const routes: Route[] = [
  { path: 'demo', component: SignalDemoComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'rx', component: RxComponent },
  { path: 'dependency-demo', component: DynamicDependencyDemoComponent },
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
];
