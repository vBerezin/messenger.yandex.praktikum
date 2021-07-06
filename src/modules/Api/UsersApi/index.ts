import { UserResponse } from '~modules/Api/types';
import { HTTP } from '~modules/HTTP';

const API_URL = 'https://ya-praktikum.tech/api/v2/user';

export const UsersApi = {
  async getUser(id: number): Promise<UserResponse> {
    const request = await HTTP.get(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
};
