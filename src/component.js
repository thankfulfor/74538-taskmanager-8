import {createElement} from './utils';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Не смей инстанцировать BaseComponent, его можно только наследовать)`);
    }

    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`Нужно определить шаблон.`);
  }

  bind() {}

  unbind() {}

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }
  unrender() {
    this.unbind();
    this._element = null;
  }
}

