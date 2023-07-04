import { effect, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { Message } from './message';

export const messages = [
  { userId: 1, title: 'First message', text: 'This is a message', seen: false },
  {
    userId: 1,
    title: 'Important message',
    text: 'Very important message',
    seen: false,
  },
];

@Injectable()
export class FakeService {
  constructor() {}

  private selectedUserId = signal(1);
  public messages = signal<Message[]>([]);

  private loadMessages(userId: number): Observable<Message[]> {
    return of(messages.filter((message) => message.userId === userId));
  }

  // Shouldn't be used for propagation of state changed (see docs)
  messagesEffect = effect(
    () => {
      // Subscription has to be handled manually
      // Not recommendaded way: ExpressionChangedAfterItHasBeenChecked error can arise
      this.loadMessages(this.selectedUserId()).subscribe((m) =>
        this.messages.set(m)
      );
    },
    { allowSignalWrites: true }
  );

  // Subscription is handled automatically
  // ReadOnly signal is created!!
  public messages2 = toSignal(this.loadMessages(1), {
    initialValue: [] as Message[],
  });

  public markSeen(message: Message) {
    this.messages.mutate(
      (messages) =>
        (messages.find((m) => m.title === message.title)!.seen = true)
    );
  }
}
