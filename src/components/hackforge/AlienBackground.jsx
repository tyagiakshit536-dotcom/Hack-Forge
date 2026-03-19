import React, { useEffect, useRef } from "react";
import { useTheme } from "../../lib/themeContext";

export default function AlienBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);

    // Particles
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Orbiting rings
    const rings = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: 60 + i * 40,
      speed: 0.002 + i * 0.0008,
      angle: Math.random() * Math.PI * 2,
      opacity: 0.08 + i * 0.015,
    }));

    // Grid lines
    const gridSpacing = 80;

    // Hex grid cells
    const hexCells = Array.from({ length: 15 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 30 + Math.random() * 40,
      opacity: 0,
      targetOpacity: Math.random() * 0.15,
      speed: 0.003 + Math.random() * 0.005,
    }));

    // Shooting stars
    const shoots = [];
    const spawnShoot = () => {
      shoots.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.5,
        len: 80 + Math.random() * 120,
        speed: 6 + Math.random() * 8,
        angle: Math.PI / 6 + (Math.random() - 0.5) * 0.4,
        opacity: 1,
        life: 1,
      });
    };

    const hexPath = (x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(a);
        const py = y + size * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    let t = 0;
    let lastShoot = 0;

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, W, H);

      // Animated grid
      ctx.strokeStyle = theme.primary + "0a";
      ctx.lineWidth = 0.5;
      const offset = (t * 20) % gridSpacing;
      for (let x = -gridSpacing + offset; x < W + gridSpacing; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = -gridSpacing + offset; y < H + gridSpacing; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Hex cells
      hexCells.forEach((h) => {
        h.opacity += (h.targetOpacity - h.opacity) * 0.02;
        if (Math.abs(h.opacity - h.targetOpacity) < 0.001) {
          h.targetOpacity = Math.random() * 0.15;
        }
        hexPath(h.x, h.y, h.size);
        ctx.strokeStyle = theme.primary + Math.floor(h.opacity * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Orbiting rings
      rings.forEach((ring) => {
        ring.angle += ring.speed;
        const gx = ring.x + Math.cos(ring.angle) * ring.radius * 0.3;
        const gy = ring.y + Math.sin(ring.angle) * ring.radius * 0.15;
        ctx.beginPath();
        ctx.ellipse(gx, gy, ring.radius, ring.radius * 0.35, ring.angle * 0.2, 0, Math.PI * 2);
        ctx.strokeStyle = theme.secondary + Math.floor(ring.opacity * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Particles with connection lines
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const glow = (Math.sin(p.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = theme.primary + Math.floor((0.3 + glow * 0.7) * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = theme.primary + Math.floor((1 - d / 120) * 40).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Shooting stars
      if (t - lastShoot > 2 && Math.random() < 0.02) {
        spawnShoot();
        lastShoot = t;
      }
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.025;
        if (s.life <= 0) { shoots.splice(i, 1); continue; }
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        grad.addColorStop(0, theme.accent + "ff");
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * s.life;
        ctx.stroke();
      }

      // Pulsing center aura
      const auraR = 200 + Math.sin(t * 0.5) * 50;
      const auraGrad = ctx.createRadialGradient(W / 2, H * 0.3, 0, W / 2, H * 0.3, auraR);
      auraGrad.addColorStop(0, theme.primary + "08");
      auraGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.3, auraR, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}