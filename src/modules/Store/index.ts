import { StoreEvents } from './events';
import { StoreState } from './types';
import { Events } from '~modules/Events';

class StateStorage extends Events<StoreEvents> {
  public readonly events = StoreEvents;
  private readonly state: StoreState = {};
  private readonly storage = window.sessionStorage;

  constructor() {
    super();
    const state = this.storage.getItem('state-storage');
    if (state) {
      this.state = JSON.parse(state);
    }
    this.on(StoreEvents.userProfileUpdate, (data) => {
      this.setState('user.profile', data);
    });
  }

  private setState(path: string, data) {
    path
      .split('.')
      .reduce((state, current, index, arr ) => {
        if (!state[current]) {
          state[current] = {};
        }
        if (index === arr.length - 1) {
          state[current] = {...state[current],...data};
        }
        return state[current];
      }, this.state);
    this.storage.setItem('state-storage', JSON.stringify(this.state));
  }

  getState() {
    return this.state;
  }
}

export const Store = new StateStorage();
