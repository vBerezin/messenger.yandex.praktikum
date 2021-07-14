import {
  UserResponse,
} from '~modules/Api/types';
import {
  avatarChangeRequest,
  changePasswordRequest,
  findUserRequest,
  UserUpdateRequest
} from './types';
import { HTTP } from '~modules/HTTP';

const API_URL = 'https://ya-praktikum.tech/api/v2/user';

export const UsersApi = {
  async getUser(id: number): Promise<UserResponse> {
    const request = await HTTP.get(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
  async profile(data: UserUpdateRequest): Promise<UserResponse> {
    const request = await HTTP.put(`${API_URL}/profile`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return JSON.parse(request.response);
  },
  async password(data: changePasswordRequest): Promise<UserResponse> {
    const request = await HTTP.put(`${API_URL}/password`, {
      data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return JSON.parse(request.response);
  },
  async profileAvatar(data: avatarChangeRequest): Promise<UserResponse> {
    const request = await HTTP.put(`${API_URL}/profile/avatar`, {
      data,
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
  async search(data: findUserRequest): Promise<UserResponse[]> {
    const request = await HTTP.post(`${API_URL}/search`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return JSON.parse(request.response);
  }
};
