const mouse = document.getElementById("mouse");

window.addEventListener("mousemove", (e) => {
  mouse.style.top = e.y + "px";
  mouse.style.left = e.x + "px";
});
