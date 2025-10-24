import { useEffect, useRef } from 'react';

interface GradientBackgroundProps {
  className?: string;
  gradientType?: 'navy-to-gold' | 'gold-to-navy' | 'blue-to-teal' | 'purple-to-pink';
}

export function GradientBackground({
  className = '',
  gradientType = 'navy-to-gold',
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGradient();
    };

    // Draw gradient based on type
    const drawGradient = () => {
      if (!ctx) return;

      let gradient;
      switch (gradientType) {
        case 'navy-to-gold':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, 'rgba(18, 57, 133, 0.9)');
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0.5)');
          break;
        case 'gold-to-navy':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
          gradient.addColorStop(1, 'rgba(18, 57, 133, 0.9)');
          break;
        case 'blue-to-teal':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, 'rgba(58, 134, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(29, 209, 161, 0.8)');
          break;
        case 'purple-to-pink':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, 'rgba(131, 56, 236, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 0, 128, 0.8)');
          break;
        default:
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, 'rgba(18, 57, 133, 0.9)');
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0.5)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Initial setup
    resizeCanvas();

    // Handle resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gradientType]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
      aria-hidden="true"
    />
  );
}