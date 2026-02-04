import type { Shape, ShapeType } from "../types";

export const randomColor = () => Math.floor(Math.random() * 0xffffff);
  const randomShapeType = (): ShapeType => {
    const types: ShapeType[] = [
      "triangle",
      "square",
      "pentagon",
      "hexagon",
      "circle",
      "ellipse",
      "random",
    ];
    return types[Math.floor(Math.random() * types.length)];
  };
  export const createShape = (x: number, y: number): Shape => ({
    x,
    y,
    type: randomShapeType(),
    color: randomColor(),
    size: 20 + Math.random() * 30,
  });