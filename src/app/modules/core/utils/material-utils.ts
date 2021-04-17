import {
  Color,
  LineBasicMaterial,
  LineDashedMaterial,
  Material
  } from 'three';
import { LineStyle } from '#core/models/theme/line-style';


export const buildLineMaterial = (style: LineStyle): Material => {
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
