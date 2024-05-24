import { useEffect, useMemo, useState } from "react";

export default function Background() {
  const initialPosition = useMemo(
    () => ({
      primaryCircle: { x: -200, y: 100 },
      secondaryCircle: { x: 200, y: 200 },
    }),
    []
  );

  const [circlePosition, setCirclePosition] = useState(initialPosition);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const offsetX1 = (e.clientX - window.innerWidth / 2) * 0.07;
      const offsetY1 = (e.clientY - window.innerHeight / 2) * 0.05;
      const offsetX2 = (e.clientX - window.innerWidth / 2) * 0.04;
      const offsetY2 = (e.clientY - window.innerHeight / 2) * 0.03;

      setCirclePosition({
        primaryCircle: {
          x: initialPosition.primaryCircle.x + offsetX1,
          y: initialPosition.primaryCircle.y + offsetY1,
        },
        secondaryCircle: {
          x: initialPosition.secondaryCircle.x + offsetX2,
          y: initialPosition.secondaryCircle.y + offsetY2,
        },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initialPosition]);

  return (
    <div className="fixed top-0 left-0 overflow-hidden inset-0 flex justify-center items-center gap-20 background_square -z-10 bg-pattern">
      <div
        className="mb-20 mr-40 rounded-full w-72 h-72 bg-gradient-to-b from-green-500 to-sky-600 opacity-30 blur-3xl"
        style={{
          position: "absolute",
          transform: `translate(${circlePosition.primaryCircle.x}px, ${circlePosition.primaryCircle.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      ></div>
      <div
        className="mt-20 rounded-full w-52 h-52 bg-gradient-to-b from-cyan-500 to-purple-500 opacity-30 blur-3xl"
        style={{
          position: "absolute",
          transform: `translate(${circlePosition.secondaryCircle.x}px, ${circlePosition.secondaryCircle.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      ></div>
    </div>
  );
}
