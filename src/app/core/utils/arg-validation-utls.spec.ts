import { ensureArgDefined, ensureStringDefinedNotEmpty, ensureArgArrayDefinedNotEmpty } from '#core/utils/arg-validation-utils';

describe('ArgValidator', () => {

  describe('ensureArgDefined', () => {

    describe('should throw expected error', () => {

      it('if arg is undefined', () => {
        expect(() => ensureArgDefined(undefined, 'test1')).toThrow(new Error('test1 arg must be defined, but was \'undefined\''));
      });

      it('if arg is null', () => {
        expect(() => ensureArgDefined(null, 'test2')).toThrow(new Error('test2 arg must be defined, but was \'null\''));
      });

      it('if arg is NaN', () => {
        expect(() => ensureArgDefined(NaN, 'test3')).toThrow(new Error('test3 arg must be defined, but was \'NaN\''));
      });

      it('if the arg is an empty string', () => {
        expect(() => ensureArgDefined('', 'test4')).toThrow(new Error('test4 arg must be defined, but was \'\''));
      });

    });

    describe('should do nothing', () => {

      it('if the arg is false', () => {
        ensureArgDefined(false, 'test5');
      });

      it('if the arg is 0', () => {
        ensureArgDefined(0, 'test6');
      });

      it('if the arg is defined', () => {
        ensureArgDefined(new Object(), 'test7');
      });

    });
  });

  describe('ensureStringDefinedNotEmpty', () => {

    describe('should throw expected error', () => {

      it('if arg is undefined', () => {
        expect(() => ensureStringDefinedNotEmpty(undefined, 'test10'))
          .toThrow(new Error('test10 arg must be defined, but was \'undefined\''));
      });

      it('if arg is null', () => {
        expect(() => ensureStringDefinedNotEmpty(null, 'test11'))
          .toThrow(new Error('test11 arg must be defined, but was \'null\''));
      });

      it('if arg is an empty string', () => {
        expect(() => ensureStringDefinedNotEmpty('', 'test12'))
          .toThrow(new Error('test12 arg must be defined, but was \'\''));
      });

      it('if arg is a string with spaces only', () => {
        expect(() => ensureStringDefinedNotEmpty('   ', 'test13'))
          .toThrow(new Error('test13 arg must be defined, but was \'   \''));
      });

    });

    it('should do nothing if the arg is a string', () => {
      ensureStringDefinedNotEmpty('abc', 'test14');
    });

  });

  describe('ensureArgArrayDefinedNotEmpty should throw expected error', () => {

    it('if arg is null', () => {
      expect(() => ensureArgArrayDefinedNotEmpty(null, 'test14'))
        .toThrow(new Error('test14 arg must be defined, but was \'null\''));
    });

    it('if arg is undefined', () => {
      expect(() => ensureArgArrayDefinedNotEmpty(undefined, 'test15'))
        .toThrow(new Error('test15 arg must be defined, but was \'undefined\''));
    });

    it('if arg is an empty array', () => {
      expect(() => ensureArgArrayDefinedNotEmpty([], 'test16'))
        .toThrow(new Error('test16 arg must be defined, but was \'[]\''));
    });

  });

});
