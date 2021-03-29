
export interface Layer {
  code: string;
  objects: Array<any>;
  label: string;
  loadFromUrl: boolean;
  description?: string;
  subLayers?: Array<Layer>;
}
