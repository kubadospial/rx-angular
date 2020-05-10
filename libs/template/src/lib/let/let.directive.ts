import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import {
  NextObserver,
  Observable,
  ObservableInput,
  Observer,
  Unsubscribable
} from 'rxjs';
import {
  assertTemplate,
  createRenderAware,
  getStrategies,
  RenderAware
} from '../core';
import { RxIfContext } from '../if';

export interface RxLetContext<T = unknown> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit?: T;
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLet?: T;
  // set context var complete to true (var$; let e = $error)
  $error?: boolean;
  // set context var complete to true (var$; let c = $complete)
  $complete?: boolean;
}

class ReactiveContext<T> {
  initialized: boolean;
  error: Error;
  complete: boolean;
  value: T;
}

function getInitial() {
  return {
    initialized: false,
    error: undefined,
    complete: false,
    value: undefined
  };
}
interface TemplateManager<T> {
  upsertTemplateRef(name: string, templateRef: TemplateRef<T>): void;
  getEmbeddedView(name: string): EmbeddedViewRef<T>;
  updateContext(newContext: T): void;
}

function createTemplateManager<T>(): TemplateManager<T> {
  let context: ReactiveContext<T> = getInitial();
  const templateRefs: {
    [name: string]: TemplateRef<any>;
  } = {};

  const viewRefs: {
    [name: string]: EmbeddedViewRef<any>;
  } = {};

  return {
    updateContext,
    upsertTemplateRef,
    getEmbeddedView
  };

  function updateContext(newContext: T): void {
    context = { ...context, ...newContext };
  }

  function upsertTemplateRef(name: string, templateRef: TemplateRef<T>) {
    this.viewRefs[name] = this._viewContainer.createEmbeddedView(
      templateRefs[name],
      this._context
    );
  }

  function getEmbeddedView(name: string): EmbeddedViewRef<T> {
    return viewRefs[name];
  }
}

/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
 * It also helps with several internal processing under the hood.
 *
 * The current way of binding an observable to the view looks like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * <app-number-special [number]="n">
 * </app-number-special>
 * </ng-container>
 *  ```
 *
 *  The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden
 *
 * Included Features:
 * - binding is always present. (`*ngIf="truthy$"`)
 * - it takes away the multiple usages of the `async` or `push` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
 *   `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
 *   `ɵdetectChanges`)
 * - distinct same values in a row (distinctUntilChanged operator),
 *
 * @usageNotes
 *
 * The `*rxLet` directive take over several things and makes it more convenient and save to work with streams in the
 *   template
 * `<ng-container *rxLet="observableNumber$ as c"></ng-container>`
 *
 * ```html
 * <ng-container *rxLet="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 *
 * <ng-container *rxLet="observableNumber$; let n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error value
 * - complete base-state
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n; let e = $error, let c = $complete">
 * <app-number [number]="n"  *ngIf="!e && !c">
 * </app-number>
 * <ng-container *ngIf="e">
 * There is an error: {{e}}
 * </ng-container>
 * <ng-container *ngIf="c">
 * Observable completed: {{c}}
 * </ng-container>
 * </ng-container>
 * ```
 *
 * @publicApi
 */
@Directive({ selector: '[rxLet]' })
export class RxLet<T> implements OnDestroy {
  @Input('rxLet')
  set potentialObservable(
    potentialObservable: ObservableInput<T> | null | undefined
  ) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(config: string | Observable<string> | undefined) {
    if (config) {
      this.renderAware.nextStrategy(config);
    }
  }

  @Input('rxLetInitial')
  set initialTemplateRef(templateRef: TemplateRef<T> | null) {
    this.viewManager.upsertTemplateRef('initial', templateRef);
  }

  constructor(
    cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxLetContext<T>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.renderAware = createRenderAware<T>({
      strategies: getStrategies<T>({ cdRef }),
      resetObserver: this.resetObserver,
      updateObserver: this.updateObserver
    });
    this.subscription = this.renderAware.subscribe();
  }

  static ngTemplateGuard_rxLet: 'binding';

  viewManager = createTemplateManager<T>();
  private embeddedView: any;
  private readonly viewContext: RxLetContext<T | undefined | null> = {
    $implicit: undefined,
    rxLet: undefined,
    $error: false,
    $complete: false
  };

  protected readonly subscription: Unsubscribable;
  private readonly renderAware: RenderAware<T | null | undefined>;
  private readonly resetObserver: NextObserver<void> = {
    next: () => {
      // if not initialized no need to set undefined
      if (this.embeddedView) {
        this.viewContext.$implicit = undefined;
        this.viewContext.rxLet = undefined;
        this.viewContext.$error = false;
        this.viewContext.$complete = false;
      }
    }
  };
  private readonly updateObserver: Observer<T | null | undefined> = {
    next: (value: T | null | undefined) => {
      // to have init lazy
      if (!this.embeddedView) {
        this.createEmbeddedView();
      }
      this.viewContext.$implicit = value;
      this.viewContext.rxLet = value;
    },
    error: (error: Error) => {
      // to have init lazy
      if (!this.embeddedView) {
        this.createEmbeddedView();
      }
      this.viewContext.$error = true;
    },
    complete: () => {
      // to have init lazy
      if (!this.embeddedView) {
        this.createEmbeddedView();
      }
      this.viewContext.$complete = true;
    }
  };

  static ngTemplateContextGuard<U>(
    dir: RxLet<U>,
    ctx: unknown | null | undefined
  ): ctx is RxLetContext<U> {
    return true;
  }

  createEmbeddedView() {
    this.embeddedView = this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      this.viewContext
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.viewContainerRef.clear();
  }
}
