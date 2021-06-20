import { ButtonProps } from '~components/Button/types';
import { FormFieldProps } from '~components/FormField/types';

export type FormAuthProps = {
  title: string,
  fields: FormFieldProps[],
  buttons: ButtonProps[],
};
