/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import type { Shape } from "../../types";
import { Container, Graphics, Stage } from "@pixi/react";

interface PixiCanvasProps {
  shapes: Shape[];
}

export const PixiCanvas: React.FC<PixiCanvasProps> = ({ shapes }) => (
  <Stage width={800} height={600} options={{ backgroundColor: 0xffffff }}>
    <Container>
      {shapes.map((s, idx) => (
        <Graphics
          key={idx}
          x={s.x}
          y={s.y}
          draw={(g) => {
            g.clear();
            g.beginFill(s.color);

            switch (s.type) {
              case "triangle":
                g.moveTo(0, -s.size / 2);
                g.lineTo(s.size / 2, s.size / 2);
                g.lineTo(-s.size / 2, s.size / 2);
                g.closePath();
                break;

              case "square":
                g.drawRect(-s.size / 2, -s.size / 2, s.size, s.size);
                break;

              case "pentagon":
                for (let i = 0; i < 5; i++) {
                  const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                  const px = s.size * Math.cos(a);
                  const py = s.size * Math.sin(a);
                  i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
                }
                g.closePath();
                break;

              case "hexagon":
                for (let i = 0; i < 6; i++) {
                  const a = (i * 2 * Math.PI) / 6 - Math.PI / 2;
                  const px = s.size * Math.cos(a);
                  const py = s.size * Math.sin(a);
                  i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
                }
                g.closePath();
                break;

              case "circle":
                g.drawCircle(0, 0, s.size / 2);
                break;

              case "ellipse":
                g.drawEllipse(0, 0, s.size, s.size / 2);
                break;

              case "random":
                g.drawRect(-s.size / 2, -s.size / 2, s.size, s.size);
                break;
            }

            g.endFill();
          }}
        />
      ))}
    </Container>
  </Stage>
);
