import { ROUTES } from '~common/scripts/routes';
import { TemplatorCompiler, TemplatorProps } from '~modules/Templator/types';

/**
 * @param { Function } compiler - parcel при импорте .pug файла возвращает функцию pug.compile
 * @param { Object } data - параметры передаваемые в pug при компиляции шаблона
 * @function Compile  - Компилирует pug шаблон с параметрами и возвращает Element
 * */

function mods(base: string, mods: string[]) {
  return [].concat(mods).map((mod) => {
    return mod && `${base}--${mod}`;
  });
}

export class Templator {
    props: Record<string, any>;
    compiler: TemplatorCompiler;

    constructor({ compiler, props }: TemplatorProps) {
      this.props = props;
      this.compiler = compiler;
    }

    compile() {
      const template = window.document.createElement('template');
      template.innerHTML = this.compiler({
        mods,
        ROUTES,
        props: this.props,
      });
      const { children } = template.content;
      if (children.length > 1) {
        throw new Error('Шаблон должен иметь 1 родительский элемент');
      }
      return template.content.children[0];
    }
}
