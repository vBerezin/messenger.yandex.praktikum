import './style.scss';
import template from './template.pug';
import { Component } from 'common/scripts/modules/Component';

export class PageError extends Component {
  constructor(props) {
    super({ template, props });
  }
}
