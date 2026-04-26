"use client";

/**
 * SpaceTimeFabric — интерактивный фон из сетки пространства-времени.
 * Реагирует на движение мыши, создавая эффект гравитационного искажения.
 */

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  ox: number; // оригинальная x
  oy: number; // оригинальная y
}

export default function SpaceTimeFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Настройки сетки
    const COLS = 28;
    const ROWS = 18;
    const INFLUENCE = 180;   // радиус влияния мыши
    const STRENGTH = 55;     // сила искажения
    const EASE = 0.08;       // плавность

    let W = 0, H = 0;
    let points: Point[] = [];
    let targets: { x: number; y: number }[] = [];

    // Инициализация точек сетки
    function init() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;

      points = [];
      targets = [];

      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const ox = (c / COLS) * W;
          const oy = (r / ROWS) * H;
          points.push({ x: ox, y: oy, ox, oy });
          targets.push({ x: ox, y: oy });
        }
      }
    }

    // Обновление позиций под влиянием мыши
    function update() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = mx - p.ox;
        const dy = my - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE) {
          const force = (1 - dist / INFLUENCE) * STRENGTH;
          targets[i].x = p.ox - (dx / dist) * force;
          targets[i].y = p.oy - (dy / dist) * force;
        } else {
          targets[i].x = p.ox;
          targets[i].y = p.oy;
        }

        // Плавное сближение
        p.x += (targets[i].x - p.x) * EASE;
        p.y += (targets[i].y - p.y) * EASE;
      }
    }

    // Отрисовка сетки
    function draw() {
      ctx!.clearRect(0, 0, W, H);

      ctx!.strokeStyle = "rgba(139, 115, 85, 0.18)";
      ctx!.lineWidth = 0.6;

      const idx = (r: number, c: number) => r * (COLS + 1) + c;

      // Горизонтальные линии
      for (let r = 0; r <= ROWS; r++) {
        ctx!.beginPath();
        for (let c = 0; c <= COLS; c++) {
          const p = points[idx(r, c)];
          c === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }

      // Вертикальные линии
      for (let c = 0; c <= COLS; c++) {
        ctx!.beginPath();
        for (let r = 0; r <= ROWS; r++) {
          const p = points[idx(r, c)];
          r === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }
    }

    function loop() {
      update();
      draw();
      animRef.current = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function onResize() {
      init();
    }

    init();
    loop();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
