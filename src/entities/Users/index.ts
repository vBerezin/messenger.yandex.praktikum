import { UsersApi } from '~modules/Api/UsersApi';

export const Users = {
  async getUser(id: number) {
    return await UsersApi.getUser(id);
  },
};
