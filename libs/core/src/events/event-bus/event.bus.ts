import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleDestroy,
  Scope,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { from, Observable, ReplaySubject, Subscription } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { IClientStatic } from '../../interfaces/client.interface';
import { ICommand } from '../../interfaces/command.interface';
import { IEvent } from '../../interfaces/event.interface';

export const ofType = <T extends IEvent>(Event: Type<T>) =>
  filter<IEvent<any>, T>((event): event is T => event.name === Event.name);

export interface IProcessStep {
  (event$: Observable<IEvent>): Observable<ICommand | void>;
}

export type IProcessManager = Record<string, IProcessStep>;

export interface IProcessStepRegistration {
  processManager: Type<IProcessManager>;
  step: string;
}

const Steps = new Set<IProcessStepRegistration>();

export const Step = () => (
  target: InstanceType<Type<any>>,
  property: string,
): void => {
  Steps.add({ processManager: target.constructor, step: property });
};

@Injectable({ scope: Scope.DEFAULT })
export class EventBus implements OnApplicationBootstrap, OnModuleDestroy {
  private logger = new Logger(this.constructor.name);
  private subject$ = new ReplaySubject<IEvent>(1);
  private subscription!: Subscription;

  get event$(): Observable<IEvent> {
    return this.subject$.asObservable();
  }

  constructor(
    private readonly client: IClientStatic,
    private readonly moduleRef: ModuleRef,
  ) {}

  processEvent<T extends IEvent>(event: T): void {
    this.subject$.next(event);
  }

  onApplicationBootstrap(): void {
    this.logger.log(`Subscribing to Sagas...`);
    this.subscription = from(Steps)
      .pipe(
        map((registration) => this.getProcessStep(registration)),
        filter((step): step is IProcessStep => !!step),
        mergeMap((step) => step(this.subject$)),
        filter((result): result is ICommand => result instanceof ICommand),
      )
      .subscribe((command) =>
        this.subject$
          .pipe(
            take(1),
            mergeMap((event) => this.client.execute(command, event.context)),
          )
          .subscribe(),
      );
  }

  onModuleDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
      this.logger.log(`Unsubscribed from Sagas.`);
    }
  }

  private getProcessStep(
    registration: IProcessStepRegistration,
  ): IProcessStep | undefined {
    return Object.getOwnPropertyDescriptor(
      this.moduleRef.get(registration.processManager, { strict: false }) ?? {},
      registration.step,
    )?.value;
  }
}
