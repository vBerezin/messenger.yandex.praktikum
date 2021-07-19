import { UserResponse } from '~modules/Api/types';

export type UserUpdateRequest = Omit<UserResponse, 'id'>;

export type changePasswordRequest = {
  oldPassword: string,
  newPassword: string
};

export type avatarChangeRequest = FormData;

export type findUserRequest = Pick<UserResponse, 'login'>;
