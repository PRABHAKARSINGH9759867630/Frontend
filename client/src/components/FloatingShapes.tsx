import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  type: 'circle' | 'square' | 'triangle' | 'blob';
}

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random shapes
  const shapes: Shape[] = Array.from({ length: 8 }, (_, i) => {
    const colors = [
      'rgba(255, 87, 87, 0.3)', // coral
      'rgba(131, 56, 236, 0.3)', // purple
      'rgba(58, 134, 255, 0.3)', // blue
      'rgba(29, 209, 161, 0.3)', // teal
    ];
    
    const types: Shape['type'][] = ['circle', 'square', 'triangle', 'blob'];
    
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      type: types[Math.floor(Math.random() * types.length)],
    };
  });

  // Render shape based on type
  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              rotate: `${shape.rotation}deg`,
            }}
            animate={{
              x: [0, 30, 0, -30, 0],
              y: [0, 20, 40, 20, 0],
              rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'square':
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-md"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              rotate: `${shape.rotation}deg`,
            }}
            animate={{
              x: [0, -40, 0, 40, 0],
              y: [0, 30, 60, 30, 0],
              rotate: [shape.rotation, shape.rotation + 90, shape.rotation + 180, shape.rotation + 270, shape.rotation + 360],
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              rotate: `${shape.rotation}deg`,
            }}
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -30, 0, 30, 0],
              rotate: [shape.rotation, shape.rotation - 180, shape.rotation - 360],
            }}
            transition={{
              duration: 18 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'blob':
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              rotate: `${shape.rotation}deg`,
            }}
            animate={{
              borderRadius: [
                '60% 40% 30% 70% / 60% 30% 70% 40%',
                '30% 60% 70% 40% / 50% 60% 30% 60%',
                '60% 40% 30% 70% / 60% 30% 70% 40%',
              ],
              x: [0, -30, 0, 30, 0],
              y: [0, 20, 40, 20, 0],
              rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
            }}
            transition={{
              duration: 22 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {shapes.map(renderShape)}
    </div>
  );
}