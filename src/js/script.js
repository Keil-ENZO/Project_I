const mouse = document.getElementById("mouse");

window.addEventListener("mousemove", (e) => {
  mouse.style.top = e.y + "px";
  mouse.style.left = e.x + "px";
});


// Function pour le menu burger
function Menu(e) {
  let menu = document.querySelector("ul");
  e.classList.contains("fa-bars")
    ? (e.classList.replace("fa-bars", "fa-xmark"),
      menu.classList.add("top-[80px]"),
      menu.classList.add("opacity-100"))
    : (e.classList.replace("fa-xmark", "fa-bars"),
      menu.classList.remove("top-[80px]"),
      menu.classList.remove("opacity-100"));
}



