import { StoreActions, StoreEvents, StorePaths, StoreState } from './types';
import { Events } from '~modules/Events';

class StateStorage extends Events<StoreEvents> {
  events = StoreEvents;
  public readonly state: StoreState = {
    users: [],
    chats: [],
    profile: undefined,
  };
  private readonly storage = window.sessionStorage;
  private readonly actions: StoreActions = {
    [StoreEvents.profileUpdate]: (data) =>{
      this.setState(StorePaths.profile, data);
    },
    [StoreEvents.profileDelete]: () => {
      this.setState(StorePaths.profile, undefined);
    },
    [StoreEvents.chatsUpdate]: (data) => {
      this.setState(StorePaths.chats, data);
    },
  };

  constructor() {
    super();
    const state = this.storage.getItem('state-storage');
    if (state) {
      this.state = JSON.parse(state);
    }
  }

  private emit(event, data) {
    this.actions[event](data);
    return super.emit(event, data);
  }

  private setState(path: keyof Record<StorePaths, string>, data) {
    path
      .split('.')
      .reduce((state, current, index, arr ) => {
        const last = index === arr.length - 1;
        if (last) {
          state[current] = data;
        } else {
          state[current] = state[current] || {};
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

window.Store = Store;
