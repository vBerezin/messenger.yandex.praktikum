import { EventEmitter } from 'events';
import { EVENTS } from '~common/scripts/events';
import { isEqual } from '~common/scripts/utils/isEqual';

enum StorageName {
  state = 'state-storage'
}

class StateStorage {
  on;
  off;
  emit;
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    this.on = this.emitter.on;
    this.off = this.emitter.off;
    this.emit = this.emitter.emit;
    if (!window.localStorage.getItem(StorageName.state)) {
      window.localStorage.setItem(StorageName.state, '{}');
    }
  }

  setState(state) {
    const newState = {...this.state, ...state};
    if (!isEqual(this.state, newState)) {
      window.localStorage.setItem(StorageName.state, JSON.stringify(newState));
      this.emit(EVENTS.store.update, newState);
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
