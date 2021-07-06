import { ComponentProps } from '~modules/Component/types';

export type FormFieldProps = ComponentProps & {
  label?: string,
  type?: string | 'text' | 'email' | 'number' | 'password' | 'tel',
  id?: string
  name?: string,
  value?: string | number,
  form?: HTMLFormElement,
  readonly?: Boolean,
  required?: Boolean,
  disabled?: Boolean,
  validate?: (value: string | number) => string | string[] | null,
};

export type FormFieldState = FormFieldProps & {
  errors?: string | string[] | null,
}
