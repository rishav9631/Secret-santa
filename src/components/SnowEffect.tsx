import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: string;
  animationDuration: string;
  opacity: number;
  fontSize: string;
}

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 80; i++) {
      flakes.push({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
        fontSize: `${Math.random() * 8 + 6}px`,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            opacity: flake.opacity,
            fontSize: flake.fontSize,
            top: "-20px",
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
};

export default SnowEffect;
