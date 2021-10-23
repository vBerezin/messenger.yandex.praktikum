import { UsersApi } from '~modules/Api/UsersApi';

export class UsersController {
  async getUser(id: number) {
    return UsersApi.getUser(id);
  }

  async search(data) {
    return UsersApi.search(data);
  }
}
