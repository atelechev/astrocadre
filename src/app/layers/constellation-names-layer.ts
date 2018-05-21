import { LabelledLayer } from '../core/labelled-layer';
import { Object3D } from 'three';
import { Theme } from '../core/theme';
import { ItemsTreeNode } from '../core/items-tree-node';
import { ConstellationMetadata } from './constellation-metadata';
import { VectorUtil } from './geometry/vector-util';
import { Constants } from '../core/constants';
import { RenderableText } from '../core/renderable-text';
import { TextOffsetPolicies } from '../core/text-offset-policy';

export class ConstellationNamesLayer extends LabelledLayer {

  private renderableLabels: Map<string, RenderableText>;

  private allHtmls: Array<HTMLElement>;

  constructor(tree: ItemsTreeNode,
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
    const center = VectorUtil.toVector3(constMeta.ra, constMeta.dec, Constants.WORLD_RADIUS);
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
