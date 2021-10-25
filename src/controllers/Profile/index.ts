import { AuthApi } from '~modules/Api';
import { UsersApi } from '~modules/Api/UsersApi';
import { Events } from '~modules/Events';
import { Store } from '~modules/Store';
import { StorePaths } from '~modules/Store/types';

import { ProfileControllerEvents } from './types';

export class ProfileController extends Events<ProfileControllerEvents> {
    events = ProfileControllerEvents;

    data = Store.getState<StorePaths.profile>(Store.paths.profile);

    constructor() {
      super();
      Store.on(Store.events.update, (state) => {
        if (state[Store.paths.profile]) {
          this.data = Store.getState<StorePaths.profile>(
            Store.paths.profile,
          );
          this.emit(this.events.update, this.data);
        }
      });
    }

    async getData() {
      if (this.data) {
        return this.data;
      }
      return this.identify();
    }

    async signUp(data) {
      await AuthApi.signUp(data);
      this.data = await AuthApi.identify();
      this.emit(this.events.create, this.data);
      return this.data;
    }

    async signIn(data) {
      await AuthApi.signIn(data);
      return AuthApi.identify();
    }

    async signOut() {
      await AuthApi.signOut();
      Store.setState<StorePaths.profile>(Store.paths.profile, undefined);
      this.data = undefined;
      this.emit(this.events.delete, this.data);
    }

    async identify() {
      const userResponse = await AuthApi.identify();
      Store.setState<StorePaths.profile>(Store.paths.profile, userResponse);
      return userResponse;
    }

    async update(data) {
      const userResponse = await UsersApi.profile(data);
      Store.setState<StorePaths.profile>(Store.paths.profile, userResponse);
      return userResponse;
    }

    async passwordChange(data) {
      return UsersApi.password(data);
    }

    async avatarChange(avatar: File) {
      const data = new FormData();
      data.append('avatar', avatar);
      const userResponse = await UsersApi.profileAvatar(data);
      Store.setState<StorePaths.profile>(Store.paths.profile, userResponse);
      return userResponse;
    }
}
