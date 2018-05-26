
/**
 * Wraps parameters defining the visibility of the stars layer with a specific magnitude.
 */
export interface StarLabelVisibility {

  /**
   * The max magnitude of stars to be shown.
   */
  magnitude: number;

  /**
   * The visibility of stars layers down to this magnitude.
   */
  visible: boolean;

}
