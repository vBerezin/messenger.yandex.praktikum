import { ComponentInterface } from '~modules/Component/types';

export type ProfileProps = {
  back: string,
  form: ComponentInterface
};

export type ProfileState = Partial<ProfileProps>;
