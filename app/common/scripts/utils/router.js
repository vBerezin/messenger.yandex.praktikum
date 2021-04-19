export class Router {
  #currentRoute;
  constructor() {
    this.routes = new Map();
    this.#currentRoute = '';
    window.addEventListener('load', () => this.init());
  }
  init() {
    const { location: { pathname } } = window;
    if (this.#currentRoute === pathname) {
      return false;
    }
    const hasRoute = this.routes.has(pathname);
    if (hasRoute) {
      this.#currentRoute = pathname;
      return this.routes.get(pathname)();
    }
    return this.routes.get('/404')();
  }
  add(route, renderFn) {
    this.routes.set(route, renderFn);
  }
  remove(route) {
    this.routes.delete(route);
  }
}
