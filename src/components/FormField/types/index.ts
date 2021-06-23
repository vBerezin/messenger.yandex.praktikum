import { ComponentProps } from '~common/scripts/modules/Component/types';

export type FormFieldProps = ComponentProps & {
  id: string
  label: string,
  name: string,
  type: string | 'text' | 'email' | 'number' | 'password' | 'tel',
  value?: string | number,
  form?: HTMLFormElement,
  readonly?: Boolean,
  required?: Boolean,
  disabled?: Boolean,
  validate?: (value: string | number) => string | string[] | null,
};

export type FormFieldState = {
  value?: string | number,
  readonly?: Boolean,
  required?: Boolean,
  disabled?: Boolean,
  errors?: string | string[] | null,
}
