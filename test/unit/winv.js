import winv from '../../src/winv';

describe('winv', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(winv, 'greet');
      winv.greet();
    });

    it('should have been run once', () => {
      expect(winv.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(winv.greet).to.have.always.returned('hello');
    });
  });
});
