import {
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { pageVisibilityApiSupport } from './page-visibility.helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const document: any;

@Directive({
  selector: '[mtgPageVisibility]',
})
export class PageVisibilityDirective implements OnInit, OnDestroy {
  private readonly webApi = pageVisibilityApiSupport();
  private subscriber$: Subscription = new Subscription();

  @Output() runBackgroundUpdate = new EventEmitter<void>();

  ngOnInit() {
    const subscription = fromEvent(document, this.webApi.visibilityChange).pipe(
      filter(() => document[this.webApi.hidden]),
      tap(() => this.runBackgroundUpdate.emit())
    );

    this.subscriber$ = subscription.subscribe();
  }

  ngOnDestroy(): void {
    this.subscriber$.unsubscribe();
  }
}
