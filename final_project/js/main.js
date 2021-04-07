// Webfont Loader
WebFont.load({
  google: {
    families: ["Inter", "Montserrat"],
  },
});

// Navbar Logic
const navBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("menu");

function toggleMenu() {
  mobileMenu.classList.toggle("show-menu");
}

navBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);
