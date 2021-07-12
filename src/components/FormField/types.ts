import { ComponentProps } from '~modules/Component/types';

export type FormFieldProps = ComponentProps & {
  name: string,
  label?: string,
  type?: string | 'text' | 'email' | 'number' | 'password' | 'tel',
  id?: string
  value?: string | number,
  readonly?: Boolean,
  required?: Boolean,
  disabled?: Boolean,
  validate?: (value: string | number) => string | string[] | null,
};

export type FormFieldState = Omit<FormFieldProps, 'name' | 'validate'> & {
  errors?: string | string[] | null,
}
