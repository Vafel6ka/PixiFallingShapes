export type ShapeType =
  | "triangle"
  | "square"
  | "pentagon"
  | "hexagon"
  | "circle"
  | "ellipse"
  | "random";

export interface Shape {
  x: number;
  y: number;
  type: ShapeType;
  color: number;
  size: number;
}