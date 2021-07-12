import { EventEmitter } from 'events';

export abstract class Events<TEvents> {
  private readonly emitter = new EventEmitter();

  on(event: keyof Record<TEvents, string>, callback: Function): this {
    this.emitter.on(event, callback);
    return this;
  }

  off(event: keyof Record<TEvents, string>, callback: Function): this {
    this.emitter.off(event, callback);
    return this;
  }

  emit(event: keyof Record<TEvents, string>, data?): this {
    this.emitter.emit(event, data);
    return this;
  }
}
