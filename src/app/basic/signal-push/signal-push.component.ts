import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
} from '@angular/core';

export interface Data {
  value: number;
}

export interface DataSignal {
  value: WritableSignal<number>;
}

@Component({
  selector: 'app-signal-push',
  templateUrl: './signal-push.component.html',
  styleUrls: ['./signal-push.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalPushComponent implements OnInit {
  @Input()
  public data?: Data;

  @Input()
  public signal?: DataSignal;

  constructor() {}

  ngOnInit() {}
}
