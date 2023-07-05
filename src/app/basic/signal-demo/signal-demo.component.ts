import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
  untracked,
  effect,
  WritableSignal,
} from '@angular/core';
import {
  Data,
  DataSignal,
  SignalPushComponent,
} from '../signal-push/signal-push.component';

@Component({
  selector: 'app-signal-demo',
  templateUrl: './signal-demo.component.html',
  imports: [SignalPushComponent],
  standalone: true,
  styleUrls: ['./signal-demo.component.css'],
})
export class SignalDemoComponent implements OnInit, OnDestroy {
  //-----> Imagine the following example
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

  //-----> Counter

  //                                        type param is optional, initial value required
  public counter: WritableSignal<number> = signal<number>(0);
  private intervalId?: number;
  public start() {
    this.intervalId = setInterval(
      // What if we write value++ instead of ++value??
      () => this.counter.update((value) => ++value),
      1000
    );
  }

  //----> Sum
  public a = signal(2);
  public sum = computed(() => this.a() + this.counter());

  //----> What are signals?
  // https://angular.io/guide/signals
  // https://github.com/angular/angular/tree/main/packages/core/src/signals
  // Signal = value + change notification
  /** Benefits:
   * makes our code more reactive, readable
   * makes CD more effective
   * less dependencies
   * cooperates with RxJS
   * aim is to make CD more effective -> don't depend on Zone.js
   */
  // Where can it be used? -> templates, services, directives, ... everywhere
  // 2 types: writable, read-only

  //----> Mutate signals
  public b = signal(3);
  public obj = signal({
    name: 'John Doe',
    age: 27,
  });

  public mutate() {
    // sets a new value
    this.b.set(5);

    // change based on current value
    this.b.update((value) => value * 2);

    // mutate the content
    this.obj.mutate((value) => (value.age = 28));
  }
  //----> Computed signals

  /** Pros, cons:
   * lazy: evaluates only when its read at least one place and dependencies changes
   * memoized
   * dynamic
   * read-only (not writable)
   */

  private intervalId2?: number;
  public counter2: WritableSignal<number> = signal<number>(0);
  private show = signal(false);

  // dynamic: only checks counter2 if show is true
  public computedSignal = computed(() => {
    if (this.show()) {
      return this.counter2() * 3;
    } else {
      return '--';
    }
  });

  //----> Effects
  /**
   * for side effects
   * can have dependencies
   * is destroyed when enclosing context is destroyed
   */
  public eff = effect(() => {
    console.log(this.counter2());
  });
  //----> Untracked dependencies (effects, computed)

  /**
   * Let us assume we have several signals and want to creata a computed one which only changes when one and only one of its dependencies changes
   *
   */

  public computed2 = computed(
    () => untracked(this.counter2) * this.dataSignal.value()
  );

  //----> OnPush cd
  public data: Data = { value: 42 };
  public dataSignal: DataSignal = { value: signal(42) };

  public inc() {
    this.data.value++;
    //this.dataSignal.value.update((value) => ++value);
  }

  //----> Custom equality check
  // You can define custom function to distinguish current value from previous one

  public parity = computed(() => this.counter2(), {
    equal: (_, rhs) => rhs % 2 === 0,
  });

  // Under the hood
  /**
   * Signals based on special kind of (so called) reactive graphs which consists of ReactiveNode and ReactiveEdge types. A reactive node can be a consumer and / or producer.
   */

  constructor() {}

  ngOnInit() {
    this.intervalId2 = setInterval(
      () => this.counter2.update((value) => ++value),
      1000
    );
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearInterval(this.intervalId2);
  }

  public toggle() {
    this.show.update((value) => !value);
  }
}
