import { UsersApi } from '~modules/Api/UsersApi';
import { Store } from '~modules/Store';
import { AuthApi } from '~modules/Api';
import { changePasswordRequest, UserUpdateRequest } from '~modules/Api/UsersApi/types';
import { SignInRequest, SignUpRequest } from '~modules/Api/AuthApi/types';

export const UserProfile = {
  async signUp(data: SignUpRequest) {
    await AuthApi.signUp(data);
    return await AuthApi.identify();
  },
  async signIn(data: SignInRequest) {
    await AuthApi.signIn(data);
    return await AuthApi.identify();
  },
  async signOut() {
    await AuthApi.signOut();
    Store.emit(Store.events.profileDelete);
  },
  async getUser() {
    const storedUser = Store.state.profile;
    if (storedUser) {
      return storedUser;
    }
    return this.identify();
  },
  async identify() {
    try {
      const userResponse = await AuthApi.identify();
      Store.emit(Store.events.profileUpdate, userResponse);
      return userResponse;
    } catch (e) {
      Store.emit(Store.events.profileDelete);
      return null;
    }
  },
  async update(data: UserUpdateRequest) {
    const response = await UsersApi.profile(data);
    Store.emit(Store.events.profileUpdate, response);
    return response;
  },
  async passwordChange(data: changePasswordRequest) {
    return UsersApi.password(data);
  },
  async avatarChange(avatar: File) {
    const data = new FormData();
    data.append('avatar', avatar);
    const response = await UsersApi.profileAvatar(data);
    Store.emit(Store.events.profileUpdate, response);
    return response;
  },
};
