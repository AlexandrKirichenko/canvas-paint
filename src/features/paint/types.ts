import Brush from './tools/Brush';
import Eraser from './tools/Eraser';
import Line from './tools/Line';
import Rect from './tools/Rect';
import Marker from './tools/Marker';
import Paste from './tools/Paste';
import Crop from './tools/Crop';

export const TOOL_TYPE = {
  brush: Brush,
  eraser: Eraser,
  line: Line,
  rect: Rect,
  marker: Marker,
  paste: Paste,
  crop: Crop,
} as const;

export type ToolTypeName = keyof typeof TOOL_TYPE;

export type ToolInstanceType = InstanceType<typeof TOOL_TYPE[ToolTypeName]>;

export interface RectItem {
  x: number;
  y: number;
  w: number;
  h: number;
}
