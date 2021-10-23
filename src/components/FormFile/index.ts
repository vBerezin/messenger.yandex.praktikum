import './styles';

import { Button } from '~components/Button';
import { Component } from '~modules/Component';

import { FormFileEvents } from './events';
import template from './template';
import { FormFileProps, FormFileState } from './types';

export class FormFile extends Component<
    FormFileProps,
    FormFileState,
    FormFileEvents
> {
    static events = FormFileEvents;

    private button: Button;

    constructor(props: FormFileProps) {
      super({ template, props });
      this.button = new Button({
        mods: ['blue', 'block'],
        attributes: {
          type: 'submit',
        },
        text: 'Отправить',
        ...props.button,
      });
    }

    reset() {
      if (this.el) {
        this.el.reset();
      }
      this.setState({ value: null });
      return this;
    }

    created() {
      const { input } = this.refs;
      this.el.addEventListener('change', () => {
        const file = input.files[0];
        this.setState({
          value: {
            file,
            name: file.name,
          },
        });
        this.emit(FormFile.events.change, this.state);
      });
      this.el.addEventListener('submit', (event) =>
        this.props.onSubmit.call(this, event, this.state),
      );
    }

    updated() {
      if (this.state.value) {
        this.button.mount(this.refs.footer);
      }
    }
}
