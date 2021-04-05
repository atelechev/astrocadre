
/**
 * Wraps values of X an Y axis offsets to apply on an element while calculating its position in the view.
 */
export class TextOffsets {

  public static readonly ZERO_OFFSETS = new TextOffsets(0, 0);

  constructor(
    private readonly _offsetX: number,
    private readonly _offsetY: number
  ) {

  }

  public get offsetX(): number {
    return this._offsetX;
  }

  public get offsetY(): number {
    return this._offsetY;
  }

}
