
/*
 * TODO investigate on decorators for args validation
 * http://www.typescriptlang.org/docs/handbook/decorators.html
 * It looks that it is still an experimental feature.
 *
 * Or even a validation lib like https://github.com/typestack/class-validator
 */

export class ArgValidator {

  /**
   * Validates that the first argument is not null, not undefined, not an empty string or not a NaN.
   * Throws an error with a respective message otherwise.
   *
   * @param arg the argument to validate.
   * @param argName the name of the argument, used in the error message.
   */
  public static ensureArgDefined(arg: any, argName: string): void {
    if (!arg && (arg === null || arg === undefined || arg === '' || isNaN(arg))) {
      this.throwErrorForInvalidArg(arg, argName);
    }
  }

  private static throwErrorForInvalidArg(arg: any, argName: string): void {
    throw new Error(`${argName} arg must be defined, but was '${arg}'`);
  }

  /**
   * Validates that the string of the first argument is defined and not empty and does not contain only spaces.
   * Throws an error with a respective message otherwise.
   *
   * @param arg the argument to validate.
   * @param argName the name of the argument, used in the error message.
   */
  public static ensureStringDefinedNotEmpty(arg: string, argName: string): void {
    if (arg === null || arg === undefined || arg.trim() === '') {
      this.throwErrorForInvalidArg(arg, argName);
    }
  }

}
