import { Type } from '@nestjs/common';
import { IEvent } from '../../interfaces/event.interface';

export class EventRegistry {
  static events = new Map<string, Type<IEvent>>();

  static register<T extends Type<IEvent>>(Event: T) {
    this.events.set(Event.name, Event);
  }

  static lookup<T extends Type<IEvent>>(name: string): T {
    if (!this.events.has(name)) {
      throw new Error(`"${name}" not registered. Use @RegisterEvent()`);
    }
    return this.events.get(name) as T;
  }
}

export const RegisterEvent = () => <T extends Type<IEvent>>(target: T) =>
  EventRegistry.register(target);
