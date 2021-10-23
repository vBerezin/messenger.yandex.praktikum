import { UsersApiUser } from '~modules/Api/UsersApi/types';
import { HTTP } from '~modules/HTTP';

import {
  AuthApiSignInRequest,
  AuthApiSignUpRequest,
  AuthApiSignUpResponse,
} from './types';

const API_URL = 'https://ya-praktikum.tech/api/v2/auth';

export const AuthApi = {
  async signUp(data: AuthApiSignUpRequest): Promise<AuthApiSignUpResponse> {
    const request = await HTTP.post(`${API_URL}/signup`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },

  async signIn(data: AuthApiSignInRequest) {
    return HTTP.post(`${API_URL}/signin`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async signOut() {
    return HTTP.post(`${API_URL}/logout`, {
      withCredentials: true,
    });
  },

  async identify(): Promise<UsersApiUser> {
    const request = await HTTP.get(`${API_URL}/user`, {
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
};
