import { ButtonProps } from '~components/Button/types';

export type FormFileState = {
  value?: null | {
    file: File,
    name: string
  },
  button?: ButtonProps,
};

export type FormFileProps = {
  action: string,
  input: {
    name: string
  },
  button?: ButtonProps,
}
