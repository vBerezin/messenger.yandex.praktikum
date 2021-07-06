import { FormFieldProps } from '~components/FormField/types';

export type FormUserProps = {
  edit?: boolean,
  submit?: Function,
  image?: string | null,
  title?: string,
  fields: Array<{
    label: string,
    value: string
  }> | FormFieldProps[],
}

export type FormUserState = {
  edit?: boolean,
  image?: string | null,
  title?: string,
}
