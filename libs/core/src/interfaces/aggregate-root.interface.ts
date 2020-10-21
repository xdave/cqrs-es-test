import { Type } from '@nestjs/common';
import { ICommand } from './command.interface';
import { IContext } from './context.interface';
import { IEvent } from './event.interface';

interface ICommandHandler {
  (command: ICommand): void;
}

interface IEventHandler<T> {
  (event: IEvent): Partial<T>;
}

const CommandHandlers = new Map<string, ICommandHandler>();
const EventHandlers = new Map<string, IEventHandler<any>>();

interface INamed {
  name: string;
}

const handlerKey = <A extends INamed, B extends INamed>(target: A, action: B) =>
  [target.name, action.name].join('-');

export const CommandHandler = (Command: Type<ICommand>) => (
  target: any,
  _key: string,
  desc: PropertyDescriptor,
) => {
  CommandHandlers.set(handlerKey(target.constructor, Command), desc.value);
};

export const EventHandler = (Event: Type<IEvent>) => (
  target: any,
  _key: string,
  desc: PropertyDescriptor,
) => {
  EventHandlers.set(handlerKey(target.constructor, Event), desc.value);
};

export interface IProps {
  id: string;
}

export abstract class IAggregateRoot<T extends IProps> implements IProps {
  #events: IEvent[] = [];
  #props: T;

  get id(): string {
    return this.#props.id;
  }

  constructor(hydrateFrom: T = {} as T) {
    this.#props = hydrateFrom;
  }

  execute = (command: ICommand): void => {
    const handler = CommandHandlers.get(handlerKey(this.constructor, command));
    handler?.call(this, command);
  };

  apply = (event: IEvent, context?: IContext, isFromHistory = false): this => {
    if (!isFromHistory) {
      if (context) {
        IContext.copy(context, event);
      }
      this.#events.push(event);
    }
    const handler = EventHandlers.get(handlerKey(this.constructor, event));
    Object.assign<T, Partial<T> | undefined>(
      this.#props,
      handler?.call(this, event),
    );
    return this;
  };

  loadFromHistory = (events: IEvent[]): this => {
    return events.reduce(
      (aggregate, event) => aggregate.apply(event, undefined, true),
      this,
    );
  };

  getUncommittedEvents = (): IEvent[] => this.#events;

  toJSON(): Readonly<T> {
    return this.#props;
  }
}
