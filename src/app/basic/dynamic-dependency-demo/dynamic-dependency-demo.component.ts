import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  computed,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-dependency-demo',
  templateUrl: './dynamic-dependency-demo.component.html',
  styleUrls: ['./dynamic-dependency-demo.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DynamicDependencyDemoComponent implements OnInit {
  public counter: WritableSignal<number> = signal<number>(0);
  private show = signal(false);

  // dynamic: only checks counter2 if show is true
  public computedSignal = computed(() => {
    if (this.show()) {
      return this.counter() * 3;
    } else {
      return '--';
    }
  });

  public eff = effect(() => {
    console.log(this.computedSignal());
  });

  constructor() {}

  ngOnInit() {
    /*setInterval(() => this.counter.update((value) => ++value), 1000);*/
  }

  public toggle() {
    this.show.update((value) => !value);
  }

  public inc() {
    this.counter.update((value) => ++value);
  }
}
