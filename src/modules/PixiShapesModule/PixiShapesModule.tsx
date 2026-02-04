import React, { useEffect, useRef, useState } from "react";
import { createShape } from "../../utils";
import type { Shape } from "../../types";
import { Controls, PixiCanvas, StatsPanel } from "../../components";

export const PixiFallingShapes: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [spawnRate, setSpawnRate] = useState(1);
  const [gravity, setGravity] = useState(2);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto spawn
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prev) => {
        const next = [...prev];
        for (let i = 0; i < spawnRate; i++) {
          next.push(createShape(Math.random() * 800, -50));
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [spawnRate]);

  // Gravity loop
  useEffect(() => {
    let id: number;

    const tick = () => {
      setShapes((prev) =>
        prev
          .map((s) => ({ ...s, y: s.y + gravity }))
          .filter((s) => s.y - s.size / 2 <= 600),
      );

      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(id);
  }, [gravity]);

  // Click
  const handleClick = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    setShapes((prev) => {
      for (let i = prev.length - 1; i >= 0; i--) {
        const s = prev[i];

        const dx = mx - s.x;
        const dy = my - s.y;
        const r = s.size / 2;

        if (dx * dx + dy * dy <= r * r) {
          const next = [...prev];

          next[i] = {
            ...s,
            color: Math.floor(Math.random() * 0xffffff), // 🎨 новий колір
          };

          return next;
        }
      }
      return [...prev, createShape(mx, my)];
    });
  };

  const totalArea = shapes.reduce(
    (acc, s) => acc + Math.PI * (s.size / 2) ** 2,
    0,
  );

  return (
    <div>
      <div style={{ marginBottom: 10, display: "flex", gap: 20 }}>
        <StatsPanel count={shapes.length} area={totalArea} />

        <Controls
          spawnRate={spawnRate}
          gravity={gravity}
          onSpawnChange={(v) => setSpawnRate(Math.max(0, v))}
          onGravityChange={(v) => setGravity(Math.max(0, v))}
        />
      </div>

      <div
        ref={containerRef}
        style={{ width: 800, height: 600 }}
        onPointerDown={handleClick}
      >
        <PixiCanvas shapes={shapes} />
      </div>
    </div>
  );
};
