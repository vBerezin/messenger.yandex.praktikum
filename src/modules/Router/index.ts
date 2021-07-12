import { documentReady } from '~common/scripts/utils/documentReady';
import { EventEmitter } from 'events';
import { RouterEvents } from './events';

class AppRouter {
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
    // window.addEventListener('hashchange', () => this.start());
    //documentReady(() => this.start());
    window.onpopstate = () => this.start();
  }

  get url(): string {
    const {pathname, hash} = window.location;
    return `${pathname}${hash}`;
  }

  start(): this {
    return this.go(this.url);
  }

  go(route: string, data?): this {
    if (this.currentRoute === route) {
      return this;
    }
    const onRoute = this.routes.get(route);
    if (onRoute) {
      try {
        this.currentRoute = route;
        const state = {
          prev: this.url,
          data: data ? JSON.stringify(data) : ''
        };
        this.history.pushState(state, '', route);
        return onRoute(data);
      } catch (error) {
        this.emit(RouterEvents.error, {error, route});
        return this;
      }
    }
    this.emit(RouterEvents.error, {
      route,
      error: new Error(`Route "${route}" not found`),
    });
    return this;
  }

  use(routes: string | string[], onRoute: Function): this {
    [].concat(routes).forEach((route) => {
      if (this.routes.has(route)) {
        throw new Error(`Route ${route} already use`);
      }
      this.routes.set(route, onRoute);
    });
    return this;
  }

  remove(route: string): this {
    this.routes.delete(route);
    return this;
  }

  back(): this {
    this.history.back();
    return this;
  }

  forward(): this {
    this.history.forward();
    return this;
  }

  catch(callback): this {
    this.on(RouterEvents.error, callback);
    return this;
  }
}

const Router = new AppRouter();

export { Router };
