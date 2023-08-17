const mouse = document.getElementById("mouse");
const navBar = document.getElementById("navBar");
let lastScroll = 0;
// Event pour faire bouger le curseur
window.addEventListener("mousemove", (e)=>{
    mouse.style.top = e.y + "px";
    mouse.style.left = e.x + "px";
});
// Event pour faire bouger la navBar
window.addEventListener("scroll", ()=>{
    if (window.scrollY < lastScroll) navBar.style.top = "0";
    else navBar.style.top = "-80px";
    lastScroll = window.scrollY;
});
// Function pour le menu burger
function Menu(e) {
    let menu = document.querySelector("ul");
    e.classList.contains("fa-bars") ? (e.classList.replace("fa-bars", "fa-xmark"), menu.classList.add("top-[80px]"), menu.classList.add("opacity-100")) : (e.classList.replace("fa-xmark", "fa-bars"), menu.classList.remove("top-[80px]"), menu.classList.remove("opacity-100"));
}

//# sourceMappingURL=index.09c24910.js.map
