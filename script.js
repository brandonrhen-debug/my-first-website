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
      // Only fire confetti the first time
      if (hasLiked) return;
      hasLiked = true;

      likeButton.classList.add("liked");
      fireConfetti();
    });
  }
});

function fireConfetti() {
  const colors = ["#facc15", "#22c55e", "#38bdf8", "#f97316", "#ec4899", "#e5e7eb"];
  const numPieces = 60;

  for (let i = 0; i < numPieces; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    // random horizontal movement (left/right)
    const randomX = (Math.random() * 200 - 100).toFixed(0) + "px"; // -100px to 100px
    piece.style.setProperty("--x-move", randomX);

    // start roughly near the center
    piece.style.left = 50 + (Math.random() * 20 - 10) + "%";

    // random color
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(piece);

    // remove the piece after the animation ends
    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}
