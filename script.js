body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #333;
}const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
