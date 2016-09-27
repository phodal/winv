import winv from '../../src/winv';

describe('winv', () => {
  describe('Component', function () {
    it('should be able convert dom to json', function () {
      var newDiv = document.createElement('div');
      var newContent = document.createTextNode('Hi there and greetings!');
      newDiv.appendChild(newContent); //add the text node to the newly created div.

      winv.nodeToJSON(newDiv).toBe('{}');
    });
  });
});
