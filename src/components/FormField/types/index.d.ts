export type FormFieldProps = {
  id: string
  label: string,
  name: string,
  value?: string | number,
  form: HTMLFormElement,
  type:
    'text'
    | 'email'
    | 'number'
    | 'password'
    | 'tel',
  required: Boolean,
  validate: (value: string | number) => string | string[] | null,
};

export type FormFieldState = {
  value: string | number,
  errors?: string | string[] | null,
}
