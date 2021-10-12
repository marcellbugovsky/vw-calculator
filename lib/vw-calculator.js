'use babel';

import VwCalculatorView from './vw-calculator-view';
import { CompositeDisposable } from 'atom';

const editor = atom.workspace.getActiveTextEditor();
let viewport;
let pxInput;
let vwValue;

export default {

  vwCalculatorView: null,
  modalPanel: null,
  subscriptions: null,

  config: {
    'viewport': {
      'title': "Please enter your viewport.",
      'type': "integer",
      'default': 360
    }
  },

  insert() {
    pxInput = this.vwCalculatorView.getElement().childNodes[1].value;
    vwValue = Math.round((pxInput / viewport * 100) * 100) / 100;
    editor.insertText(vwValue + 'vw');
    this.toggle();
  },

  activate(state) {
    viewport = atom.config.get('vw-calculator.viewport');

    this.vwCalculatorView = new VwCalculatorView(state.vwCalculatorViewState, viewport);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vwCalculatorView.getElement(),
      visible: false,
      autoFocus: true
    });

    this.subscriptions = new CompositeDisposable();

    this.vwCalculatorView.getElement().childNodes[1].addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.insert();
      } else if (e.key === 'Escape') {
        this.toggle();
      };
    });

    this.vwCalculatorView.getElement().childNodes[2].addEventListener('click', (e) => {
      this.insert();
    });

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vw-calculator:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vwCalculatorView.destroy();
  },

  serialize() {
    return {
      vwCalculatorViewState: this.vwCalculatorView.serialize()
    };
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
