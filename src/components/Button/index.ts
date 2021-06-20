import './styles';
import template from './template';
import { Component } from '~common/scripts/modules/Component';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { ButtonProps } from './types';

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps & ComponentProps) {
    super({ template, props });
  }
}
