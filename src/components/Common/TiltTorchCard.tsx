import React, { useRef, useState } from "react";

interface TiltTorchCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltTorchCard = ({ children, className = "" }: TiltTorchCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHoverPos({ x, y });

    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`rounded-2xl shadow-2xl !bg-white dark:!bg-primary transition-transform duration-300 p-4 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        background: `radial-gradient(circle at ${hoverPos.x}px ${hoverPos.y}px, rgba(255, 255, 255, 0.3), transparent 80%)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default TiltTorchCard;
