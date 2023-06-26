import { Route } from '@angular/router';
import { SignalDemoComponent } from './basic/signal-demo/signal-demo.component';

export const routes: Route[] = [
  { path: 'demo', component: SignalDemoComponent },
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
];
