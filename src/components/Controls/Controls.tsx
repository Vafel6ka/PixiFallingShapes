import React from "react";

interface ControlsProps {
  spawnRate: number;
  gravity: number;
  onSpawnChange: (v: number) => void;
  onGravityChange: (v: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  spawnRate,
  gravity,
  onSpawnChange,
  onGravityChange,
}) => (
  <div style={{ display: "flex", gap: 20 }}>
    <div>
      <button onClick={() => onSpawnChange(spawnRate - 1)}>Spawn -</button>
      <span style={{ margin: "0 5px" }}>{spawnRate}</span>
      <button onClick={() => onSpawnChange(spawnRate + 1)}>Spawn +</button>
    </div>

    <div>
      <button onClick={() => onGravityChange(gravity - 1)}>Gravity -</button>
      <span style={{ margin: "0 5px" }}>{gravity}</span>
      <button onClick={() => onGravityChange(gravity + 1)}>Gravity +</button>
    </div>
  </div>
);
