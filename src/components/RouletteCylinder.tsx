import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RouletteCylinderProps {
  rotation: number;
  isSpinning: boolean;
}

const RouletteCylinder = forwardRef<HTMLDivElement, RouletteCylinderProps>(
  ({ rotation, isSpinning }, ref) => {
    const chamberPositions = [
      { x: 0, y: -35 },
      { x: 30, y: -17.5 },
      { x: 30, y: 17.5 },
      { x: 0, y: 35 },
      { x: -30, y: 17.5 },
      { x: -30, y: -17.5 },
    ];

    return (
      <div className="relative">
        {/* Outer ring glow effect */}
        <div
          className={cn(
            "absolute inset-[-20px] rounded-full",
            "bg-gradient-to-r from-primary/20 via-transparent to-primary/20",
            isSpinning && "animate-[spin_0.5s_linear_infinite]"
          )}
        />

        {/* Ball orbit container */}
        <div
          className={cn(
            "absolute inset-[-30px] rounded-full",
            isSpinning && "animate-[spin_0.3s_linear_infinite]"
          )}
          style={{
            animationDirection: "reverse",
          }}
        >
          {/* The spinning ball */}
          <div
            className={cn(
              "absolute w-5 h-5 rounded-full",
              "bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-600",
              "shadow-[0_0_15px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(255,255,255,0.4)]",
              "top-0 left-1/2 -translate-x-1/2",
              !isSpinning && "transition-all duration-1000"
            )}
            style={{
              transform: isSpinning
                ? "translateX(-50%)"
                : `translateX(-50%) translateY(${25 + Math.random() * 10}px)`,
            }}
          />
        </div>

        {/* Secondary ball trail */}
        {isSpinning && (
          <div
            className="absolute inset-[-30px] rounded-full animate-[spin_0.4s_linear_infinite] opacity-50"
            style={{ animationDirection: "reverse" }}
          >
            <div
              className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 
                         shadow-[0_0_10px_rgba(255,255,255,0.5)] top-0 left-1/2 -translate-x-1/2 blur-[1px]"
            />
          </div>
        )}

        {/* Main cylinder */}
        <div
          ref={ref}
          className={cn(
            "relative w-[clamp(220px,45vw,300px)] h-[clamp(220px,45vw,300px)]",
            "rounded-full border-[10px] border-zinc-700",
            "bg-gradient-to-br from-zinc-800 via-zinc-900 to-black",
            "flex items-center justify-center",
            "shadow-[0_0_60px_hsl(355_100%_64%/0.4),inset_0_0_60px_rgba(0,0,0,0.7)]",
            isSpinning &&
              "transition-transform duration-[4s] ease-[cubic-bezier(0.23,1,0.32,1)]"
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Inner ring detail */}
          <div className="absolute inset-4 rounded-full border-2 border-zinc-600/50" />
          <div className="absolute inset-8 rounded-full border border-zinc-700/30" />

          {/* Center Pin */}
          <div
            className={cn(
              "absolute w-[18%] h-[18%] rounded-full z-20",
              "bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600",
              "shadow-[0_0_25px_hsl(45_100%_50%/0.8),inset_0_2px_4px_rgba(255,255,255,0.4)]",
              "animate-pulse-glow"
            )}
          />

          {/* Center pin highlight */}
          <div className="absolute w-[8%] h-[8%] rounded-full bg-gradient-to-br from-white/60 to-transparent z-30 -translate-x-[15%] -translate-y-[15%]" />

          {/* Chambers */}
          {chamberPositions.map((pos, index) => (
            <div
              key={index}
              className="absolute w-[16%] h-[16%] rounded-full"
              style={{
                transform: `translate(${pos.x}%, ${pos.y}%)`,
              }}
            >
              {/* Chamber outer ring */}
              <div
                className={cn(
                  "absolute inset-0 rounded-full",
                  "bg-gradient-to-br from-zinc-800 to-black",
                  "border-2 border-zinc-600/50",
                  "shadow-[inset_0_0_15px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.5)]"
                )}
              />
              {/* Chamber inner hole */}
              <div
                className="absolute inset-[20%] rounded-full bg-black 
                           shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
              />
              {/* Chamber highlight */}
              <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] rounded-full bg-zinc-600/30" />
            </div>
          ))}

          {/* Radial lines between chambers */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <div
              key={angle}
              className="absolute w-[2px] h-[35%] bg-gradient-to-b from-transparent via-zinc-600/30 to-transparent"
              style={{
                transform: `rotate(${angle}deg) translateY(-32%)`,
                transformOrigin: "center center",
              }}
            />
          ))}
        </div>

        {/* Outer decorative ring */}
        <div
          className={cn(
            "absolute inset-[-15px] rounded-full border-4 border-zinc-800/50",
            "shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
          )}
        />

        {/* Pointer/indicator at top */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30">
          <div
            className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] 
                       border-l-transparent border-r-transparent border-t-primary
                       drop-shadow-[0_0_10px_hsl(355_100%_64%/0.8)]"
          />
        </div>
      </div>
    );
  }
);

RouletteCylinder.displayName = "RouletteCylinder";

export default RouletteCylinder;
