export type Tack = "starboard" | "port" | "none";

const wrap180 = (deg: number): number => ((deg + 540) % 360) - 180;

// Positive: wind arrives from the right of the bow. Negative: from the left.
export const relativeWind = (headingDeg: number, windFromDeg: number): number =>
  wrap180(windFromDeg - headingDeg);

export const isLuffing = (
  headingDeg: number,
  windFromDeg: number,
  noGoHalfAngleDeg: number,
): boolean =>
  Math.abs(relativeWind(headingDeg, windFromDeg)) < noGoHalfAngleDeg - 1e-6;

export const tackOf = (headingDeg: number, windFromDeg: number): Tack => {
  const rel = relativeWind(headingDeg, windFromDeg);
  if (Math.abs(rel) < 1e-6) return "none";
  return rel > 0 ? "starboard" : "port";
};
