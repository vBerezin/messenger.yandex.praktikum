import { FormUserProps } from '~components/FormUser/types';
import { StoreUser } from '~common/scripts/modules/Store/types';

export type ProfileKeys = {
  label: string,
  name: string,
};

export type ProfileProps = {
  user: {
    id: number
  },
  back?: string,
};

export type ProfileState = {
  back?: string,
  edit?: boolean,
  data?: StoreUser,
  password?: boolean,
  user?: Pick<FormUserProps, 'user'>,
};
