import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CANVAS, COLORS } from "../brand/theme";

const SANS = "Helvetica, Arial, sans-serif";
const HAND = "'Bradley Hand', 'Segoe Print', 'Comic Sans MS', cursive";

const HORIZON = 905;
const WEDGE_TOP = 595;
const WEDGE_APEX = { x: 540, y: HORIZON };
const NO_GO_HALF = 45;

// Placeholder sky and sea. Once a person-free water and sky photo exists at
// public/assets/backgrounds/ocean-plate.jpg, set this to false.
const USE_PLACEHOLDER_PLATE = true;
const PLATE_SRC = "assets/backgrounds/ocean-plate.jpg";

const CUTOUT = { src: "assets/characters/hero-cutout.png", left: -90, top: -100, width: 1115 };

const fade = (frame: number, start: number, duration = 12): number =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

const Plate: React.FC = () => {
  const streaks = useMemo(() => {
    const r = seeded(7);
    return Array.from({ length: 260 }, () => {
      const y = HORIZON + 10 + r() * (CANVAS.height - HORIZON - 10);
      const t = (y - HORIZON) / (CANVAS.height - HORIZON);
      return {
        x: r() * 1200 - 100,
        y,
        len: 20 + 60 * t + r() * 80,
        w: 1 + 3 * t,
        o: 0.07 + 0.16 * t,
      };
    });
  }, []);

  if (!USE_PLACEHOLDER_PLATE) {
    return (
      <Img
        src={staticFile(PLATE_SRC)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <svg
      width={CANVAS.width}
      height={CANVAS.height}
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2F78D0" />
          <stop offset="100%" stopColor="#A9CBF1" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E80AA" />
          <stop offset="100%" stopColor="#0C3A78" />
        </linearGradient>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4F7FA" stopOpacity="0" />
          <stop offset="100%" stopColor="#F4F7FA" stopOpacity="0.45" />
        </linearGradient>
        <filter id="soft">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <rect x={0} y={0} width={CANVAS.width} height={HORIZON} fill="url(#sky)" />
      <g filter="url(#soft)" fill="#FFFFFF" opacity={0.75}>
        <ellipse cx={820} cy={760} rx={150} ry={36} />
        <ellipse cx={880} cy={735} rx={90} ry={34} />
        <ellipse cx={330} cy={690} rx={110} ry={26} />
        <ellipse cx={560} cy={820} rx={140} ry={20} />
      </g>
      <rect
        x={0}
        y={HORIZON - 70}
        width={CANVAS.width}
        height={70}
        fill="url(#haze)"
      />
      <rect
        x={0}
        y={HORIZON}
        width={CANVAS.width}
        height={CANVAS.height - HORIZON}
        fill="url(#sea)"
      />
      {streaks.map((s, i) => (
        <line
          key={i}
          x1={s.x}
          y1={s.y}
          x2={s.x + s.len}
          y2={s.y}
          stroke="#FFFFFF"
          strokeOpacity={s.o}
          strokeWidth={s.w}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

export const CutoutHook: React.FC = () => {
  const frame = useCurrentFrame();

  const dx =
    (WEDGE_APEX.y - WEDGE_TOP) * Math.tan((NO_GO_HALF * Math.PI) / 180);
  const shadow = "0 4px 18px rgba(0,0,0,0.45)";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
      <Plate />

      <svg
        width={CANVAS.width}
        height={CANVAS.height}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <g opacity={fade(frame, 20)}>
          <text
            x={540}
            y={498}
            textAnchor="middle"
            fontFamily={SANS}
            fontWeight={700}
            fontSize={34}
            fill={COLORS.nearWhite}
            stroke={COLORS.navy}
            strokeWidth={8}
            paintOrder="stroke"
          >
            Wind
          </text>
          {[300, 420, 540, 660, 780].map((wx) => (
            <g key={wx}>
              <line
                x1={wx}
                y1={516}
                x2={wx}
                y2={565}
                stroke={COLORS.nearWhite}
                strokeWidth={8}
                strokeLinecap="round"
              />
              <polygon
                points={`${wx},595 ${wx - 18},560 ${wx + 18},560`}
                fill={COLORS.nearWhite}
              />
            </g>
          ))}
        </g>

        <g opacity={fade(frame, 38)}>
          <polygon
            points={`${WEDGE_APEX.x},${WEDGE_APEX.y} ${WEDGE_APEX.x - dx},${WEDGE_TOP} ${WEDGE_APEX.x + dx},${WEDGE_TOP}`}
            fill={COLORS.red}
            fillOpacity={0.25}
          />
          <line
            x1={WEDGE_APEX.x}
            y1={WEDGE_APEX.y}
            x2={WEDGE_APEX.x - dx}
            y2={WEDGE_TOP}
            stroke={COLORS.red}
            strokeWidth={5}
            strokeDasharray="18 14"
          />
          <line
            x1={WEDGE_APEX.x}
            y1={WEDGE_APEX.y}
            x2={WEDGE_APEX.x + dx}
            y2={WEDGE_TOP}
            stroke={COLORS.red}
            strokeWidth={5}
            strokeDasharray="18 14"
          />
          <text
            x={540}
            y={780}
            textAnchor="middle"
            fontFamily={SANS}
            fontWeight={800}
            fontSize={64}
            fill={COLORS.nearWhite}
            stroke={COLORS.red}
            strokeWidth={10}
            paintOrder="stroke"
          >
            NO-GO ZONE
          </text>
          <text
            x={540}
            y={836}
            textAnchor="middle"
            fontFamily={SANS}
            fontSize={40}
            fill={COLORS.nearWhite}
            stroke={COLORS.navy}
            strokeWidth={8}
            paintOrder="stroke"
          >
            sail luffs, no power
          </text>
        </g>
      </svg>

      <Img
        src={staticFile(CUTOUT.src)}
        style={{
          position: "absolute",
          left: CUTOUT.left,
          top: CUTOUT.top,
          width: CUTOUT.width,
          filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.35))",
          opacity: fade(frame, 0, 10),
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 620,
          background:
            "linear-gradient(to bottom, rgba(29,35,53,0.6), rgba(29,35,53,0))",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 36,
          left: 60,
          padding: "10px 28px",
          borderRadius: 999,
          backgroundColor: COLORS.sailBlue,
          color: COLORS.nearWhite,
          fontFamily: SANS,
          fontSize: 38,
          opacity: fade(frame, 0, 8),
        }}
      >
        Windsurfing basics
      </div>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 60,
          right: 60,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 112,
          lineHeight: 1.05,
          color: COLORS.nearWhite,
          textShadow: shadow,
          opacity: fade(frame, 4, 14),
        }}
      >
        <div>Why you can’t</div>
        <div style={{ color: COLORS.yellow }}>sail directly</div>
        <div>
          into <span style={{ color: COLORS.sky }}>the wind?</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 70,
          bottom: 330,
          fontFamily: HAND,
          fontSize: 60,
          color: COLORS.nearWhite,
          textShadow: shadow,
          transform: "rotate(-6deg)",
          opacity: fade(frame, 70),
        }}
      >
        Find the right angle!
      </div>
    </AbsoluteFill>
  );
};
