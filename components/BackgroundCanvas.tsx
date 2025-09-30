import React, { useEffect, useRef } from 'react';

// Added properties for pulsing animation
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
}

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      nodesRef.current = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          // Initialize properties for pulsing effect
          radius: 1.5 + Math.random() * 1.5,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = (time: number = 0) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
        
        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections with dynamic fading
      const maxDistance = 120;
      ctx.lineWidth = 0.5; // Made lines thinner for a more subtle look

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
          );
          
          if (distance < maxDistance) {
            const baseOpacity = (1 - distance / maxDistance);
            // Shimmer effect creates dynamic fading in and out of connections
            const shimmer = (Math.sin(time / 1500 + nodeA.x / 50) + 1) / 2;
            const opacity = baseOpacity * shimmer * 0.4;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulsing effect
      ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
      nodesRef.current.forEach(node => {
        // Calculate current radius based on time for a gentle pulse
        const pulse = (Math.sin(time / 700 + node.pulseOffset) + 1) / 2;
        const currentRadius = node.radius + pulse * 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initNodes();
    // Start animation loop, which will pass a timestamp to `animate`
    animate();

    const handleResize = () => {
      resizeCanvas();
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default BackgroundCanvas;
