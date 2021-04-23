
/**
 * Defines the style properties of a textured object shown in the main view.
 */
export interface TextureStyle {
  /**
   * The path to the image containing the texture to use.
   */
  image: string;
  /**
   * The multiplication factor for the texture. Directly impacts the size
   * of the shown object.
   */
  sizeMultiplier: number;
}
