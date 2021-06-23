import { UsersUser } from '~entities/Users/types';

import { FormField } from '~components/FormField';

export type FormUserKey = {
  readonly?: boolean;
  label: string,
  name: string,
  id: string,
  type: string,
};

export type FormUserProps = {
  data: UsersUser,
}

export type FormUserState = {
  edit?: boolean,
  password?: boolean,
  action?: string,
  image?: string,
  fields?: FormField[]
}
