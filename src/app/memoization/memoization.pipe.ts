import { Pipe, PipeTransform } from '@angular/core';

type Fn = (...args: any) => any;

@Pipe({
  name: 'memoization',
  standalone: true,
  pure: true,
})
export class MemoizationPipe implements PipeTransform {
  transform(fn: Fn, ...args: Parameters<typeof fn>[]): ReturnType<typeof fn> {
    return fn(...args);
  }
}
