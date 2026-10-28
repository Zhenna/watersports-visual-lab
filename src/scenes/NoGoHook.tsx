import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CANVAS, COLORS } from "../brand/theme";
import { TopDownSailor } from "../components/TopDownSailor";

const NO_GO_HALF = 45;
const WIND_FROM = 0;
const APEX = { x: 540, y: 1150 };
const WEDGE_TOP = 650;

export const NoGoHook: React.FC = () => {
  const frame = useCurrentFrame();

  const turn = interpolate(frame, [30, 90], [0, NO_GO_HALF], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftHeading = WIND_FROM - turn;
  const rightHeading = WIND_FROM + turn;
  const showForces = frame >= 90;

  const reach = APEX.y - WEDGE_TOP;
  const dx = reach * Math.tan((NO_GO_HALF * Math.PI) / 180);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          right: 60,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 120,
          lineHeight: 1.05,
          color: COLORS.nearWhite,
        }}
      >
        <div>Why you can’t</div>
        <div style={{ color: COLORS.yellow }}>sail directly</div>
        <div>
          into <span style={{ color: COLORS.sky }}>the wind?</span>
        </div>
      </div>

      <svg
        width={CANVAS.width}
        height={CANVAS.height}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <polygon
          points={`${APEX.x},${APEX.y} ${APEX.x - dx},${WEDGE_TOP} ${APEX.x + dx},${WEDGE_TOP}`}
          fill={COLORS.red}
          fillOpacity={0.15}
        />
        <line
          x1={APEX.x}
          y1={APEX.y}
          x2={APEX.x - dx}
          y2={WEDGE_TOP}
          stroke={COLORS.red}
          strokeWidth={4}
          strokeDasharray="18 14"
        />
        <line
          x1={APEX.x}
          y1={APEX.y}
          x2={APEX.x + dx}
          y2={WEDGE_TOP}
          stroke={COLORS.red}
          strokeWidth={4}
          strokeDasharray="18 14"
        />

        {[300, 420, 540, 660, 780].map((wx) => (
          <g key={wx}>
            <line
              x1={wx}
              y1={640}
              x2={wx}
              y2={715}
              stroke={COLORS.sky}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <polygon
              points={`${wx},745 ${wx - 18},710 ${wx + 18},710`}
              fill={COLORS.sky}
            />
          </g>
        ))}

        <text
          x={540}
          y={900}
          textAnchor="middle"
          fontFamily="Helvetica, Arial, sans-serif"
          fontWeight={800}
          fontSize={56}
          fill={COLORS.red}
        >
          NO-GO ZONE
        </text>
        <text
          x={540}
          y={960}
          textAnchor="middle"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={40}
          fill={COLORS.nearWhite}
        >
          sail luffs, no power
        </text>

        <TopDownSailor x={540} y={1310} headingDeg={WIND_FROM} scale={2} />
        <TopDownSailor
          x={270}
          y={1350}
          headingDeg={leftHeading}
          scale={2}
          showForces={showForces}
        />
        <TopDownSailor
          x={810}
          y={1350}
          headingDeg={rightHeading}
          scale={2}
          showForces={showForces}
        />
      </svg>
    </AbsoluteFill>
  );
};
