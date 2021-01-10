// Select elements from DOM
const currentYearEl = document.querySelector("#currentYear");
const lastUpdatedEl = document.querySelector("#lastUpdated");

// Find current year
const now = new Date();
const currentYear = now.getFullYear();
currentYearEl.textContent = currentYear.toString();

// Find Last Update Time

// Query Github API
fetch("https://api.github.com/repos/elvisduru/wdd230")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const lastUpdate = new Date(data.pushed_at);
    const formattedlastUpdate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "medium",
    }).format(lastUpdate);
    lastUpdatedEl.textContent = formattedlastUpdate;
  });
