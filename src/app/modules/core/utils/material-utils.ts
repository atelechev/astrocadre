import {
  Color,
  LineBasicMaterial,
  LineDashedMaterial,
  Material,
  Object3D,
  PointsMaterial,
  TextureLoader
  } from 'three';
import { LineStyle } from '#core/models/theme/line-style';
import { environment } from '#environments/environment';

const textureLoader = new TextureLoader();

/**
 * Builds a material for a line in the view.
 *
 * @param style the style proeprties of the line.
 * @returns LineBasicMaterial or LineDashedMaterial depending on the properties.
 */
export const buildLineMaterial = (style: LineStyle): Material => {
  if (!style) {
    return new LineBasicMaterial({ visible: false });
  }
  if (style.dash) {
    return new LineDashedMaterial({
      color: new Color(style.color),
      linewidth: style.width || 1,
      scale: 100,
      dashSize: style.dash,
      gapSize: style.gap,
    });
  }
  return new LineBasicMaterial({
    color: new Color(style.color),
    linewidth: style.width || 1
  });
};

/**
 * Bulds a textured material representing a point in the view.
 *
 * @param image the file containing the texture to use.
 * @param dotSize the size of the point.
 * @returns PointsMaterial the material object.
 */
export const buildPointMaterial = (image: string, dotSize: number): PointsMaterial => {
  if (!image) {
    return new PointsMaterial({ visible: false });
  }
  const textureFileInContext = environment.pathInContext(image);
  return new PointsMaterial({
    size: dotSize || 1,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.95,
    alphaTest: 0.05,
    map: textureLoader.load(textureFileInContext)
  });
};

/**
 * Builds a material using the specified builder function and assigns it to the specified
 * object.
 *
 * @param materialBuilder the material builder function.
 * @param object the object to assign the material on.
 */
export const buildAndAssignMaterial = (materialBuilder: () => Material, object: Object3D): void => {
  if (!object || !materialBuilder) {
    return;
  }
  const material = materialBuilder();
  (object as any).material = material;
  material.needsUpdate = true;
};
