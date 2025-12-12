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
