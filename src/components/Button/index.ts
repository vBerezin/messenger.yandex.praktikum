import './styles';

import { Component } from '~modules/Component';

import template from './template';
import { ButtonProps } from './types';

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ template, props });
  }
}
