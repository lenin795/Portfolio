import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function GalaxyCloudFastBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Responsive sizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Cloud nebulae (swirling with color gradients)
    const clouds = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 250 + 150, // Larger for swirling effect
      alpha: Math.random() * 0.15 + 0.05,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01, // Slow swirl
      color1: `hsl(${Math.random() * 360}, 70%, 40%)`, // Random nebula colors (purple, blue, pink)
      color2: `hsl(${Math.random() * 360}, 60%, 30%)`,
    }));
    const cloudTimelines = clouds.map(cloud =>
      gsap.to(cloud, {
        angle: "+=1", // Swirling motion
        duration: Math.random() * 30 + 20, // Slow rotation
        repeat: -1,
        ease: "linear",
        onUpdate: () => {
          cloud.x += Math.cos(cloud.angle) * 0.5; // Gentle drift
          cloud.y += Math.sin(cloud.angle) * 0.5;
          if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
          if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
          if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
          if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;
        },
      })
    );

    // Stars (with brightness variation and sparkle)
    const numStars = 200;
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 0.5, // Smaller to larger stars
      opacity: Math.random() * 0.8 + 0.2, // Brighter stars
      scale: 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      brightness: Math.random() > 0.9 ? 1.5 : 1, // Some stars brighter
    }));
    const starTimelines = stars.map(star =>
      gsap.to(star, {
        opacity: Math.random() * 0.6 + 0.4,
        scale: Math.random() * 0.4 + 0.9,
        duration: Math.random() * 1 + 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    );

    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background (dark blue to black)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1a0033"); // Dark purple-blue
      gradient.addColorStop(1, "#000000"); // Black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clouds (nebulae with swirling gradients)
      clouds.forEach(cloud => {
        const gradientCloud = ctx.createRadialGradient(
          cloud.x, cloud.y, cloud.radius * 0.1,
          cloud.x, cloud.y, cloud.radius
        );
        gradientCloud.addColorStop(0, cloud.color1);
        gradientCloud.addColorStop(0.5, cloud.color2);
        gradientCloud.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradientCloud;
        ctx.globalAlpha = cloud.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Stars (sparkling with brightness)
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * star.scale * star.brightness, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = star.brightness * 10; // Brighter stars have more glow
        ctx.fill();
        ctx.restore();

        // Move stars
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
        if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cloudTimelines.forEach(tl => tl.kill());
      starTimelines.forEach(tl => tl.kill());
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        display: "block"
      }}
    />
  );
}

export default GalaxyCloudFastBackground;