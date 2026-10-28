import React from "react";
import { Composition } from "remotion";
import { CANVAS } from "./brand/theme";
import { CutoutHook } from "./scenes/CutoutHook";
import { NoGoHook } from "./scenes/NoGoHook";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CutoutHook"
        component={CutoutHook}
        durationInFrames={120}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="NoGoHook"
        component={NoGoHook}
        durationInFrames={150}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
      />
    </>
  );
};
