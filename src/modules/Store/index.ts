import { EventEmitter } from 'events';
import { StoreEvents } from './events';
import { isEqual } from '~common/scripts/utils/isEqual';

enum StorageName {
  state = 'state-storage'
}

class StateStorage {
  private readonly on;
  private readonly off;
  private readonly emit;
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    this.on = this.emitter.on;
    this.off = this.emitter.off;
    this.emit = this.emitter.emit;
    if (!window.localStorage.getItem(StorageName.state)) {
      window.localStorage.setItem(StorageName.state, '{}');
    }
  }

  private find(path: string, state: Object) {
    if (!path) {
      return state;
    }
    try {
      return path
        .split('.')
        .reduce((current, item) => {
          return current[item];
        }, state);
    } catch (e) {
      return undefined;
    }
  }

  subscribe(path: string = '', callback: Function) {
    this.on(StoreEvents.update, (state) => {
      if (!path) {
        return callback(state);
      }
      const value = this.find(path, state);
      return callback(state, value);
    });
  }


  setState(state) {
    const newState = {...this.state, ...state};
    if (!isEqual(this.state, newState)) {
      window.localStorage.setItem(StorageName.state, JSON.stringify(newState));
      this.emit(StoreEvents.update, newState);
    }
  }

  getState() {
    const state = window.localStorage.getItem(StorageName.state);
    if (state) {
      return JSON.parse(state);
    }
    return {};
  }

  get state() {
    return this.getState()
  }

  set state(state) {
    return this.setState(state)
  }
}

export const Store = new StateStorage();

window.Store = Store;
