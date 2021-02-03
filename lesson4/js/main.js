// Get Current Date for Footer
const currentDateSpan = document.querySelector("#currentDate");

const now = new Date();
currentDateSpan.textContent = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
}).format(now);

// Handle Responsive Menu
const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");

menuBtn.addEventListener(
  "click",
  () => {
    menu.classList.toggle("show-menu");
  },
  false
);
