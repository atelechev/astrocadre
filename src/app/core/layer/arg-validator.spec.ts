import { ArgValidator } from './arg-validator';

describe('ArgValidator', () => {

  const validator = ArgValidator;

  it('#ensureArgDefined should throw expected error if arg is undefined', () => {
    expect(() => validator.ensureArgDefined(undefined, 'test1')).toThrow(new Error('test1 arg must be defined, but was \'undefined\''));
  });

  it('#ensureArgDefined should throw expected error if arg is null', () => {
    expect(() => validator.ensureArgDefined(null, 'test2')).toThrow(new Error('test2 arg must be defined, but was \'null\''));
  });

  it('#ensureArgDefined should throw expected error if arg is NaN', () => {
    expect(() => validator.ensureArgDefined(NaN, 'test3')).toThrow(new Error('test3 arg must be defined, but was \'NaN\''));
  });

  it('#ensureArgDefined should throw expected error if the arg is an empty string', () => {
    expect(() => validator.ensureArgDefined('', 'test4')).toThrow(new Error('test4 arg must be defined, but was \'\''));
  });

  it('#ensureArgDefined should do nothing if the arg is false', () => {
    validator.ensureArgDefined(false, 'test5');
  });

  it('#ensureArgDefined should do nothing if the arg is 0', () => {
    validator.ensureArgDefined(0, 'test6');
  });

  it('#ensureArgDefined should do nothing if the arg is defined', () => {
    validator.ensureArgDefined(new Object(), 'test7');
  });

  it('#ensureStringDefinedNotEmpty should throw expected error if arg is undefined', () => {
    expect(() => validator.ensureStringDefinedNotEmpty(undefined, 'test10'))
      .toThrow(new Error('test10 arg must be defined, but was \'undefined\''));
  });

  it('#ensureStringDefinedNotEmpty should throw expected error if arg is null', () => {
    expect(() => validator.ensureStringDefinedNotEmpty(null, 'test11'))
      .toThrow(new Error('test11 arg must be defined, but was \'null\''));
  });

  it('#ensureStringDefinedNotEmpty should throw expected error if arg is an empty string', () => {
    expect(() => validator.ensureStringDefinedNotEmpty('', 'test12'))
      .toThrow(new Error('test12 arg must be defined, but was \'\''));
  });

  it('#ensureStringDefinedNotEmpty should throw expected error if arg is a string with spaces only', () => {
    expect(() => validator.ensureStringDefinedNotEmpty('   ', 'test13'))
      .toThrow(new Error('test13 arg must be defined, but was \'   \''));
  });

  it('#ensureStringDefinedNotEmpty should do nothing if the arg is a string', () => {
    validator.ensureStringDefinedNotEmpty('abc', 'test14');
  });

});
