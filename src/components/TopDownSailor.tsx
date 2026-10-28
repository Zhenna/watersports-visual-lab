import React from "react";
import { COLORS } from "../brand/theme";
import { isLuffing, tackOf } from "./sailorGeometry";

type Props = {
  x: number;
  y: number;
  headingDeg: number;
  windFromDeg?: number;
  noGoHalfAngleDeg?: number;
  scale?: number;
  showForces?: boolean;
};

const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}> = ({ x1, y1, x2, y2, color }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 10;
  const half = 6;
  const bx = x2 - head * Math.cos(angle);
  const by = y2 - head * Math.sin(angle);
  const lx = bx - half * Math.sin(angle);
  const ly = by + half * Math.cos(angle);
  const rx = bx + half * Math.sin(angle);
  const ry = by - half * Math.cos(angle);
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx}
        y2={by}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} fill={color} />
    </g>
  );
};

export const TopDownSailor: React.FC<Props> = ({
  x,
  y,
  headingDeg,
  windFromDeg = 0,
  noGoHalfAngleDeg = 45,
  scale = 1,
  showForces = true,
}) => {
  const luffing = isLuffing(headingDeg, windFromDeg, noGoHalfAngleDeg);
  const mirror = tackOf(headingDeg, windFromDeg) === "port";
  const sailPath = luffing
    ? "M0,-34 Q-9,-10 0,14 T0,66"
    : "M0,-34 Q-30,6 -14,66";

  return (
    <g transform={`translate(${x} ${y}) rotate(${headingDeg}) scale(${scale})`}>
      <g transform={mirror ? "scale(-1 1)" : undefined}>
        <path
          d="M0,-80 C26,-48 24,40 17,76 L-17,76 C-24,40 -26,-48 0,-80Z"
          fill={COLORS.sailBlue}
          stroke={COLORS.navy}
          strokeWidth={1.5}
        />
        <path
          d={sailPath}
          fill="none"
          stroke={COLORS.navy}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d={sailPath}
          fill="none"
          stroke={COLORS.nearWhite}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {!luffing && (
          <>
            <line
              x1={-4}
              y1={-3}
              x2={-6}
              y2={43}
              stroke={COLORS.navy}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <line
              x1={9}
              y1={11}
              x2={-4}
              y2={1}
              stroke={COLORS.navy}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <line
              x1={9}
              y1={30}
              x2={-5}
              y2={38}
              stroke={COLORS.navy}
              strokeWidth={4}
              strokeLinecap="round"
            />
          </>
        )}
        <ellipse cx={14} cy={20} rx={9} ry={17} fill={COLORS.red} />
        <ellipse cx={14} cy={20} rx={6} ry={12} fill={COLORS.yellow} />
        <circle cx={13} cy={20} r={10} fill={COLORS.navy} />
        <circle cx={13} cy={20} r={5.5} fill="#2F3A5C" />
        {showForces && !luffing && (
          <>
            <Arrow x1={0} y1={-84} x2={0} y2={-128} color={COLORS.teal} />
            <Arrow x1={-16} y1={20} x2={-68} y2={-1} color={COLORS.yellow} />
          </>
        )}
      </g>
    </g>
  );
};
