const el = document.getElementById("rebecca");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    el.style.opacity = 1;
  } else {
    el.style.opacity = 0;
  }
});
