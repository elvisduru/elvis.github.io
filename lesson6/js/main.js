// Webfont Loader
WebFont.load({
  google: {
    families: ["Inter"],
  },
});

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

/** Banner Display */
const banner = document.querySelector("#banner");
// Show banner if today is Friday
if (now.getDay() === 5) {
  banner.classList.remove("hide");
} else {
  banner.classList.add("hide");
}
