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

// Get Current Weather
const requestUrl =
  "//api.openweathermap.org/data/2.5/onecall?lat=6.797160&lon=3.975647&exclude=minutely,hourly&units=imperial&appid=11f9be110b488889077df997d7a7dcfc";

fetch(requestUrl)
  .then((response) => response.json())
  .then((jsonObject) => {
    console.log(jsonObject);
    const currentWeather = jsonObject.current;
    const dailyForecast = jsonObject.daily;

    document.getElementById("desc").textContent =
      currentWeather.weather[0].description;
    document.getElementById("temp").textContent = currentWeather.temp;

    document.getElementById("humidity").textContent = currentWeather.humidity;
    document.getElementById("windSpeed").textContent =
      currentWeather.wind_speed;

    // Weather Forecast
    const d = new Date();

    const todayDayNumber = d.getDay();

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const weatherList = jsonObject.list;
    let forecastDayNumber = todayDayNumber;
  });
