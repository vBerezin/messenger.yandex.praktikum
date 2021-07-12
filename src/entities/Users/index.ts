import { UsersApi } from '~modules/Api/UsersApi';

export const Users = {
  async getUser(id: number) {
    return await UsersApi.getUser(id);
  },
  async search(login) {
    return UsersApi.search(login);
  }
};
