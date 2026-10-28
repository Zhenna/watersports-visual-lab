import React from "react";
import { Composition } from "remotion";
import { CANVAS } from "./brand/theme";
import { NoGoHook } from "./scenes/NoGoHook";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NoGoHook"
      component={NoGoHook}
      durationInFrames={150}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />
  );
};
