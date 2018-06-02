import { Object3D } from 'three';
import { Theme } from '../core/theme/theme';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { ConstellationMetadata } from '../core/layer/constellation-metadata';
import { toVector3 } from '../core/layer/vector-utils';
import { Constants } from '../core/constants';
import { RenderableText } from '../core/layer/label/renderable-text';
import { TextOffsetPolicies } from '../core/layer/label/text-offset-policy';
import { Layers } from '../core/layers';
import { RenderableLayer } from '../core/layer/renderable-layer';

export class ConstellationNamesLayer extends RenderableLayer {

  private renderableLabels: Map<string, RenderableText>;

  private allHtmls: Array<HTMLElement>;

  constructor(tree: LayersTreeNode,
              rawMetadata: ConstellationMetadata[]) {
    super(tree);
    this.initRenderableLabels(rawMetadata);
  }

  private initRenderableLabels(rawMetadata: ConstellationMetadata[]): void {
    this.renderableLabels = new Map<string, RenderableText>();
    this.allHtmls = new Array<HTMLElement>();
    rawMetadata.forEach(
      (constMeta: ConstellationMetadata) => {
        const renderable = this.toRenderableText(constMeta);
        this.renderableLabels.set(constMeta.code, renderable);
        this.allHtmls.push(renderable.getHtmlElement());
      });
  }

  private toRenderableText(constMeta: ConstellationMetadata): RenderableText {
    const center = toVector3(constMeta.ra, constMeta.dec, Constants.getWorldRadiusForLayer(Layers.CONSTELLATION_NAMES));
    return new RenderableText(this.getName(), 'labels', center, constMeta.names[0], TextOffsetPolicies.CENTERED);
  }

  public getObjects(): Array<Object3D> {
    return [];
  }

  public getTextElements(): Array<HTMLElement> {
    return this.allHtmls;
  }

  public useThemeForThis(theme: Theme): void {
    this.renderableLabels.forEach(
      (renderable: RenderableText, code: string) => renderable.useTheme(theme)
    );
  }

  public getRenderableLabels(): Map<string, RenderableText> {
    return this.renderableLabels;
  }

}
