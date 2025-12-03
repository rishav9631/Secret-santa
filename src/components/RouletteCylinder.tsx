import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RouletteCylinderProps {
  rotation: number;
  isSpinning: boolean;
}

const RouletteCylinder = forwardRef<HTMLDivElement, RouletteCylinderProps>(
  ({ rotation, isSpinning }, ref) => {
    const chamberPositions = [
      "translate-y-[-35%]",
      "translate-x-[28%] translate-y-[-17%]",
      "translate-x-[28%] translate-y-[17%]",
      "translate-y-[35%]",
      "translate-x-[-28%] translate-y-[17%]",
      "translate-x-[-28%] translate-y-[-17%]",
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-[clamp(200px,40vw,280px)] h-[clamp(200px,40vw,280px)]",
          "rounded-full border-8 border-muted",
          "bg-gradient-to-br from-cylinder to-background",
          "flex items-center justify-center",
          "shadow-[0_0_50px_hsl(355_100%_64%/0.3),inset_0_0_50px_rgba(0,0,0,0.5)]",
          isSpinning && "transition-transform duration-[4s] ease-[cubic-bezier(0.23,1,0.32,1)]"
        )}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Center Pin */}
        <div
          className={cn(
            "w-[15%] h-[15%] rounded-full z-20",
            "bg-gradient-to-br from-accent to-yellow-600",
            "animate-pulse-glow"
          )}
        />

        {/* Chambers */}
        {chamberPositions.map((position, index) => (
          <div
            key={index}
            className={cn(
              "absolute w-[15%] h-[15%] rounded-full",
              "bg-gradient-to-br from-zinc-900 to-black",
              "shadow-[inset_0_0_10px_rgba(0,0,0,0.8),0_0_10px_rgba(255,255,255,0.1)]",
              position
            )}
          />
        ))}
      </div>
    );
  }
);

RouletteCylinder.displayName = "RouletteCylinder";

export default RouletteCylinder;
