import {
  Injectable,
  OnApplicationBootstrap,
  Scope,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { from, Observable, of, Subject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
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
export class EventBus implements OnApplicationBootstrap {
  private subject$ = new Subject<IEvent>();

  constructor(
    private readonly client: IClientStatic,
    private readonly moduleRef: ModuleRef,
  ) {}

  processEvent<T extends IEvent>(event: T): void {
    this.subject$.next(event);
  }

  onApplicationBootstrap(): void {
    this.subject$
      .pipe(
        mergeMap((event) =>
          from(Steps).pipe(
            map((registration) => this.getProcessStep(registration)),
            mergeMap((step) => step(of(event))),
            filter((result): result is ICommand => result instanceof ICommand),
            mergeMap((command) => this.client.execute(command, event)),
          ),
        ),
      )
      .subscribe();
  }

  private getProcessStep(registration: IProcessStepRegistration): IProcessStep {
    const options = { strict: false };
    const instance = this.moduleRef.get<IProcessManager>(
      registration.processManager,
      options,
    );
    return instance[registration.step];
  }
}
