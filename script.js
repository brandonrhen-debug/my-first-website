// === Geometric background setup ===
function getBodyBackgroundBaseColor() {
  const bodyStyles = getComputedStyle(document.body);

  // Try background-color first
  let color = bodyStyles.backgroundColor;

  // If it's transparent or not useful, fall back to a dark base
  if (!color || color === "rgba(0, 0, 0, 0)" || color === "transparent") {
    color = "rgb(2, 6, 23)"; // close to your gradient's dark blue/black
  }

  return color;
}

function parseRGB(colorStr) {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return { r: 2, g: 6, b: 23 }; // fallback
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToCss(h, s, l, alpha = 1) {
  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);
  return `hsla(${hDeg}, ${sPct}%, ${lPct}%, ${alpha})`;
}

function getContrastingColor(baseColorStr) {
  const { r, g, b } = parseRGB(baseColorStr);
  let { h, s, l } = rgbToHsl(r, g, b);

  // If the background is basically gray/black (very low saturation),
  // just pick a nice teal that matches your existing accent.
  if (s < 0.1) {
    h = 0.51;   // teal-ish
    s = 0.9;
    l = 0.55;
    return { h, s, l };
  }

  // Otherwise, use complementary hue
  let contrastH = (h + 0.5) % 1;
  let contrastL = l > 0.5 ? l - 0.3 : l + 0.3;
  contrastL = Math.min(0.9, Math.max(0.1, contrastL));

  return { h: contrastH, s, l: contrastL };
}

function initBackgroundShapes() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderShapes();
  }

  function renderShapes() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    const bodyBg = getBodyBackgroundBaseColor();
    const contrastHSL = getContrastingColor(bodyBg);

    // Controls density of shapes
    const numShapes = Math.round((width * height) / 30000);

    for (let i = 0; i < numShapes; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 40 + Math.random() * 120;
      const rotation = Math.random() * Math.PI * 2;

      const lOffset = (Math.random() - 0.5) * 0.15;
      const alpha = 0.06 + Math.random() * 0.14;

      const color = hslToCss(
        contrastHSL.h,
        contrastHSL.s,
        Math.min(0.95, Math.max(0.05, contrastHSL.l + lOffset)),
        alpha
      );

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;

      const shapeType = Math.floor(Math.random() * 3); // 0 = circle, 1 = rect, 2 = triangle

      switch (shapeType) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 1: // Rounded rect
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-size / 2, -size / 2, size, size, size / 6);
          } else {
            ctx.rect(-size / 2, -size / 2, size, size);
          }
          ctx.fill();
          break;
        case 2: // Triangle
          ctx.beginPath();
          ctx.moveTo(-size / 2, size / 2);
          ctx.lineTo(0, -size / 2);
          ctx.lineTo(size / 2, size / 2);
          ctx.closePath();
          ctx.fill();
          break;
      }

      ctx.restore();
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

// === Your existing code ===

// Run after the HTML has loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Like button + confetti
  const likeButton = document.getElementById("likeButton");
  let hasLiked = false;

  if (likeButton) {
    likeButton.addEventListener("click", () => {
      if (hasLiked) return; // only once
      hasLiked = true;

      likeButton.classList.add("liked");
      fireConfetti(likeButton);
    });
  }

  // 🔹 initialize the geometric background AFTER the DOM is ready
  initBackgroundShapes();
});

function fireConfetti(sourceEl) {
  const rect = sourceEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const colors = ["#facc15", "#22c55e", "#38bdf8", "#f97316", "#ec4899", "#e5e7eb"];
  const numPieces = 80;

  for (let i = 0; i < numPieces; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    // random size
    const width = 6 + Math.random() * 4;   // 6–10px
    const height = 10 + Math.random() * 6; // 10–16px
    piece.style.width = width + "px";
    piece.style.height = height + "px";

    // starting position = center of the button
    piece.style.left = originX + "px";
    piece.style.top = originY + "px";

    // random color
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // random direction & distance
    const angle = Math.random() * Math.PI * 2; // 0–360°
    const distance = 80 + Math.random() * 80;  // 80–160px
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance + 40; // bias a little downward

    piece.style.setProperty("--dx", dx + "px");
    piece.style.setProperty("--dy", dy + "px");

    document.body.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}
