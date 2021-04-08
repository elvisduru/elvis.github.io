// Webfont Loader
WebFont.load({
  google: {
    families: ["Inter", "Montserrat"],
  },
});

const banner = document.getElementById("banner");
const closeBannerBtn = document.getElementById("closeBanner");

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
    const currentWeather = jsonObject.current;
    const dailyForecast = jsonObject.daily.slice(0, 3);
    const alerts = jsonObject.alerts;

    document.getElementById("desc").textContent =
      currentWeather.weather[0].description;
    document.getElementById("temp").textContent = currentWeather.temp + "\xB0F";

    document.getElementById("humidity").textContent = currentWeather.humidity;
    document.getElementById("windSpeed").textContent =
      currentWeather.wind_speed;

    // Check for alerts
    if (alerts) {
      banner.classList.remove("hide");
      const p = document.createElement("p");
      p.textContent = alerts[0].description;
      banner.appendChild(p);
    } else {
      banner.classList.add("hide");
    }

    closeBannerBtn.addEventListener("click", function () {
      banner.classList.add("hide");
    });

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

    let forecastDayNumber = todayDayNumber;

    dailyForecast.forEach((weather) => {
      forecastDayNumber += 1;
      if (forecastDayNumber === 7) {
        forecastDayNumber = 0;
      }
      const forecastItem = document.createElement("div");
      forecastItem.classList = "forecast-item";
      const dayName = document.createElement("h4");
      dayName.textContent = weekday[forecastDayNumber];

      const iconPath =
        "//openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
      const icon = document.createElement("img");
      icon.src = iconPath;
      icon.alt = weather.weather[0].description;

      const temp = document.createElement("p");
      temp.textContent = weather.temp.day + "\xB0F";

      forecastItem.appendChild(dayName);
      forecastItem.appendChild(icon);
      forecastItem.appendChild(temp);

      document.querySelector(".forecast-box").appendChild(forecastItem);
    });
  });
