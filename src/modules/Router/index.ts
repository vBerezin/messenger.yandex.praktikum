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
    window.onpopstate = () => this.start();
    documentReady(() => this.start());
  }

  start(): this {
    const {pathname, hash, search} = window.location;
    const path = `${pathname}${hash}`;
    if (search) {
      const params = new URLSearchParams(search.slice(1));
      const data = {};
      params.forEach((key, value) => {
        data[key] = value;
      });
      return this.go(path, data);
    }
    return this.go(path);
  }

  go(route: string, data?): this {
    if (this.currentRoute === route) {
      return this;
    }
    const onRoute = this.routes.get(route);
    if (onRoute) {
      try {
        this.currentRoute = route;
        const state = data ? JSON.stringify(data) : '';
        this.history.pushState(state, '', route);
        return onRoute(data);
      } catch (error) {
        this.emit(RouterEvents.error, {error});
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
