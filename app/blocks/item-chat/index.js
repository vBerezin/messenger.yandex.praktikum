import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/utils/component';

export class ItemChat extends Component {
  constructor(props) {
    super({ template, props });
  }
}
