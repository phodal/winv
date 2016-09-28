import winv from '../../src/winv';
import { jsdom } from 'jsdom';

const doc = jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

describe('winv', () => {
  describe('Component', function () {
    it('should be able convert dom to json', function () {
      var newDiv = document.createElement('div');
      var newContent = document.createTextNode('Hi there and greetings!');
      newDiv.appendChild(newContent); //add the text node to the newly created div.

      expect(winv.nodeToJSON(JSON.stringify(newDiv))).to.be.equal();
    });
  });
});
