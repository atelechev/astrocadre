
/*
 * TODO investigate on decorators for args validation
 * http://www.typescriptlang.org/docs/handbook/decorators.html
 * It looks that it is still an experimental feature.
 *
 * Or even a validation lib like https://github.com/typestack/class-validator
 */

export class ArgValidator {

  public static ensureArgDefined(arg: any, argName: string): void {
    if (!arg && (arg === null || arg === undefined || arg === '' || isNaN(arg))) {
      this.throwErrorForInvalidArg(arg, argName);
    }
  }

  private static throwErrorForInvalidArg(arg: any, argName: string): void {
    throw new Error(`${argName} arg must be defined, but was '${arg}'`);
  }

  public static ensureStringDefinedNotEmpty(arg: string, argName: string): void {
    if (arg === null || arg === undefined || arg.trim() === '') {
      this.throwErrorForInvalidArg(arg, argName);
    }
  }

}
