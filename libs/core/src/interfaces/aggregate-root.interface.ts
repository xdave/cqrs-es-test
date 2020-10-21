import { Type } from '@nestjs/common';
import { IAction } from './action.interface';
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

export const createActionDecorator = <
  S extends IProps,
  T extends ICommandHandler | IEventHandler<S>
>(
  storage: Map<string, T>,
) => (Action: Type<IAction>) => (
  target: IAggregateRoot<S>,
  _propertyKey: string | symbol,
  desc: TypedPropertyDescriptor<T>,
) => {
  if (desc.value) {
    storage.set(handlerKey(target.constructor, Action), desc.value);
  }
};

export const CommandHandler = createActionDecorator(CommandHandlers);
export const EventHandler = createActionDecorator(EventHandlers);

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
