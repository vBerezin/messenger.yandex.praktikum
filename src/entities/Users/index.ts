import { UsersApi } from '~modules/Api/UsersApi';
import { Store } from '~modules/Store';

export const Users = {
  async getUser(id: number) {
    return await UsersApi.getUser(id);
  },
  async profileUpdate(data) {
    const response = await UsersApi.profile(data);
    Store.setState({user: response});
    return response;
  },
  async passwordChange(data) {
    return UsersApi.password(data);
  },
  async avatarChange(avatar: File) {
    const data = new FormData();
    data.append('avatar', avatar);
    const response = await UsersApi.profileAvatar(data);
    Store.setState({user: response});
    return response;
  },
  async search(login) {
    return UsersApi.search(login);
  }
};
