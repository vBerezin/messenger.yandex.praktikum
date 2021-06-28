import { documentReady } from '~common/scripts/utils/documentReady';
import { EventEmitter } from 'events';
import { EVENTS } from '~common/scripts/events';

class Instance {
  on;
  off;
  emit;
  private emitter: EventEmitter;
  private history: History;
  private currentRoute: string;
  private routes: Map<string, Function>;

  constructor() {
    this.emitter = new EventEmitter();
    this.history = window.history;
    this.routes = new Map();
    this.currentRoute = '';
    this.on = this.emitter.on;
    this.off = this.emitter.off;
    this.emit = this.emitter.emit;
    documentReady(() => this.start());
    // window.addEventListener('hashchange', () => this.start());
    window.onpopstate = () => this.start();
  }

  private start(): this {
    const { pathname, hash, search } = window.location;
    const path = `${pathname}${hash}`;
    const params = new URLSearchParams(search.slice(1));
    const data = {};
    params.forEach((key, value) => {
      data[key] = value;
    });
    return this.go(path, data);
  }

  go(route: string, data = {}): this {
    if (this.currentRoute === route) {
      return this;
    }
    const onRoute = this.routes.get(route);
    if (onRoute) {
      try {
        this.currentRoute = route;
        this.history.pushState(data, '', route);
        return onRoute();
      } catch (error) {
        this.emit(EVENTS.router.error, { error });
      }
    }
    this.emit(EVENTS.router.error, {
      error: new Error(`Route "${route}" not found`),
    });
    return this;
  }

  add(routes: string | string[], onRoute: Function): this {
    [].concat(routes).forEach((route) => this.routes.set(route, onRoute));
    return this;
  }

  remove(route: string): this {
    this.routes.delete(route);
    return this;
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  catch(callback): void {
    this.on(EVENTS.router.error, callback);
  }
}

const Router = new Instance();

export { Router };
