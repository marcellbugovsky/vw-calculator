'use babel';

import { insert } from './vw-calculator.js';

export default class VwCalculatorView {

  constructor(serializedState ,viewport) {
    this.element = document.createElement('div');
    this.element.classList.add('block');
    this.element.classList.add('vw-calculator');;
    this.element.classList.add('native-key-bindings');;
    this.element.setAttribute('tabIndex', -1);

    const description = document.createElement('label');
    description.textContent = 'Enter your px value';
    description.classList.add('inline-block');
    description.setAttribute('for', 'vw-calculator-pxInput');
    this.element.appendChild(description);

    const input = document.createElement('input');
    input.classList.add('input-number');
    input.classList.add('inline-block');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '1');
    input.setAttribute('max', viewport);
    input.setAttribute('placeholder', viewport);
    input.setAttribute('id', 'vw-calculator-pxInput');
    this.element.appendChild(input);

    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('inline-block');
    button.textContent = 'Insert';
    input.setAttribute('id', 'vw-calculator-pxInputBtn');
    this.element.appendChild(button);

  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
