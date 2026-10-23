import React, { useEffect, useRef } from 'react';

interface ConfettiRibbonBlastProps {
  className?: string;
  duration?: number; // duration in ms
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  gravity: number;
  drag: number;
  type: 'ribbon' | 'confetti' | 'star';
  opacity: number;
  decay: number;
}

const CELEBRATION_COLORS = [
  '#10B981', // Emerald
  '#059669', // Deep Emerald
  '#4F46E5', // Indigo
  '#6366F1', // Light Indigo
  '#F59E0B', // Amber Gold
  '#FBBF24', // Warm Gold
  '#EC4899', // Pink
  '#F43F5E', // Rose
  '#06B6D4', // Cyan
  '#8B5CF6', // Purple
  '#3B82F6', // Sky Blue
];

export const ConfettiRibbonBlast: React.FC<ConfettiRibbonBlastProps> = ({
  className = '',
  duration = 5000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const particleCount = 140;

    // Launch cannons from bottom-left, bottom-right, and bottom-center
    const launchCannons = () => {
      const origins = [
        { x: width * 0.15, y: height * 0.85, angleSpread: [-75, -35] },
        { x: width * 0.85, y: height * 0.85, angleSpread: [-145, -105] },
        { x: width * 0.5, y: height * 0.9, angleSpread: [-120, -60] },
      ];

      for (let i = 0; i < particleCount; i++) {
        const origin = origins[i % origins.length];
        const angleDeg =
          origin.angleSpread[0] +
          Math.random() * (origin.angleSpread[1] - origin.angleSpread[0]);
        const angleRad = (angleDeg * Math.PI) / 180;
        const speed = 12 + Math.random() * 18;

        const isRibbon = Math.random() > 0.45;
        const isStar = !isRibbon && Math.random() > 0.6;

        particles.push({
          x: origin.x + (Math.random() - 0.5) * 40,
          y: origin.y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angleRad) * speed,
          vy: Math.sin(angleRad) * speed,
          w: isRibbon ? 6 + Math.random() * 6 : 8 + Math.random() * 8,
          h: isRibbon ? 24 + Math.random() * 28 : 8 + Math.random() * 8,
          color: CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.18,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.08 + Math.random() * 0.1,
          gravity: 0.3 + Math.random() * 0.2,
          drag: 0.965 + Math.random() * 0.015,
          type: isRibbon ? 'ribbon' : isStar ? 'star' : 'confetti',
          opacity: 1,
          decay: 0.003 + Math.random() * 0.003,
        });
      }
    };

    launchCannons();

    // Trigger secondary festive mini-blast after 700ms
    const secondaryTimer = setTimeout(() => {
      for (let i = 0; i < 40; i++) {
        const angleRad = (-130 + Math.random() * 80) * (Math.PI / 180);
        const speed = 10 + Math.random() * 14;
        particles.push({
          x: width * 0.5 + (Math.random() - 0.5) * 100,
          y: height * 0.75,
          vx: Math.cos(angleRad) * speed,
          vy: Math.sin(angleRad) * speed,
          w: 6 + Math.random() * 6,
          h: 20 + Math.random() * 24,
          color: CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.1,
          gravity: 0.28,
          drag: 0.97,
          type: 'ribbon',
          opacity: 1,
          decay: 0.004,
        });
      }
    }, 700);

    const startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = Date.now() - startTime;
      const isFadingOut = elapsed > duration - 1000;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;

        p.x += p.vx;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (isFadingOut) {
          p.opacity -= 0.02;
        } else {
          p.opacity -= p.decay;
        }

        if (p.opacity <= 0 || p.y > height + 50) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const wobbleX = Math.sin(p.wobble);

        if (p.type === 'ribbon') {
          // Curving twisting ribbon streamer
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, Math.abs(wobbleX) * (p.w / 2), p.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();

          // Ribbon highlight sheen
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(-p.w / 6, -p.h / 2, p.w / 3, p.h / 3);
        } else if (p.type === 'star') {
          // Sparkling 4-point star
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const r1 = p.w * 0.8;
          const r2 = p.w * 0.3;
          for (let step = 0; step < 8; step++) {
            const r = step % 2 === 0 ? r1 : r2;
            const a = (step * Math.PI) / 4;
            const sx = Math.cos(a) * r;
            const sy = Math.sin(a) * r;
            if (step === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Classic confetti flake with 3D wobble
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, (-p.h / 2) * wobbleX, p.w, p.h * Math.abs(wobbleX));
        }

        ctx.restore();
      }

      if (particles.length > 0 && elapsed < duration) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    render();

    return () => {
      clearTimeout(secondaryTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-30 w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
