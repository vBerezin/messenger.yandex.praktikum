import { HTTP } from '~modules/HTTP';

import {
  UsersApiAvatarRequest,
  UsersApiFindRequest,
  UsersApiPasswordRequest,
  UsersApiUpdateRequest,
  UsersApiUser,
} from './types';

const API_URL = 'https://ya-praktikum.tech/api/v2/user';

export const UsersApi = {
  async getUser(id: number): Promise<UsersApiUser> {
    const request = await HTTP.get(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
  async profile(data: UsersApiUpdateRequest): Promise<UsersApiUser> {
    const request = await HTTP.put(`${API_URL}/profile`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
  async password(data: UsersApiPasswordRequest): Promise<UsersApiUser> {
    const request = await HTTP.put(`${API_URL}/password`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
  async profileAvatar(data: UsersApiAvatarRequest): Promise<UsersApiUser> {
    const request = await HTTP.put(`${API_URL}/profile/avatar`, {
      data,
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
  async search(data: UsersApiFindRequest): Promise<UsersApiUser[]> {
    const request = await HTTP.post(`${API_URL}/search`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
};
