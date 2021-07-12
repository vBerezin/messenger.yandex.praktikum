import { UsersApi } from '~modules/Api/UsersApi';
import { Store } from '~modules/Store';
import { AuthApi } from '~modules/Api';

export const UserProfile = {
  async signUp(data) {
    await AuthApi.signUp(data);
    const userResponse = await AuthApi.identify();
    Store.emit(Store.events.userProfileUpdate, userResponse);
  },
  async signIn(data) {
    await AuthApi.signIn(data);
    const userResponse = await AuthApi.identify();
    Store.emit(Store.events.userProfileUpdate, userResponse);
  },
  async signOut() {
    await AuthApi.signOut();
    Store.emit(Store.events.userProfileUpdate, null);
  },
  async identify() {
    try {
      return await AuthApi.identify();
    } catch (e) {
      return null;
    }
  },
  async update(data) {
    const response = await UsersApi.profile(data);
    Store.emit(Store.events.userProfileUpdate, response);
    return response;
  },
  async passwordChange(data) {
    return UsersApi.password(data);
  },
  async avatarChange(avatar: File) {
    const data = new FormData();
    data.append('avatar', avatar);
    const response = await UsersApi.profileAvatar(data);
    Store.emit(Store.events.userProfileUpdate, response);
    return response;
  },
};
