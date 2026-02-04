import React from "react";

interface StatsPanelProps {
  count: number;
  area: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ count, area }) => (
  <div style={{ display: "flex", gap: 20 }}>
    <label>
      Shapes Count: <input readOnly value={count} />
    </label>

    <label>
      Total Area: <input readOnly value={area.toFixed(2)} />
    </label>
  </div>
);
