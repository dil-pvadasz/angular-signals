import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  templateUrl: './signal-demo.component.html',
  styleUrls: ['./signal-demo.component.css'],
})
export class SignalDemoComponent implements OnInit, OnDestroy {
  // Imagine the following example
  /**
   * let a = 4;
   * let b = 5;
   *
   * let c = a + b;
   * ...
   *
   * a = 6;
   * What's the value of c??
   */
  // This is an imperative code snippet, the value of c won't be updated
  // The goal is to make our code more reactive

  // Counter

  //                                        type param is optional, initial value required
  public counter: WritableSignal<number> = signal<number>(0);
  private intervalId?: number;

  // Sum
  public a = signal(2);
  public sum = computed(() => this.a() + this.counter());

  // What are signals?
  // Signal = value + change notification
  /** Benefits:
   * makes our code more reactive, readable
   * makes CD more effective
   * less dependencies
   * cooperates with RxJS
   */
  // Where can it be used? -> templates, services, directives, ... everywhere

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  public start() {
    this.intervalId = setInterval(
      () => this.counter.update((value) => ++value),
      1000
    );
  }
}
