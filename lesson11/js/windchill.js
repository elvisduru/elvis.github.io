// Compute Wind Chill
function calculateWindchill(temp, windspeed) {
  const windchillEl = document.querySelector("#windchill");

  let windchill;

  if (temp <= 50.0 && windspeed > 3.0) {
    //input matches the condition for computing wind chill
    windchill = Math.round(
      35.74 +
        0.6215 * temp -
        35.75 * Math.pow(windspeed, 0.16) +
        0.4275 * temp * Math.pow(windspeed, 0.16)
    );
    windchillEl.textContent = windchill + "\u00B0F";
  } else {
    windchill = "N/A";
    windchillEl.textContent = windchill;
  }
}

const path = location.pathname.substring(1);

const cities = new Map();
cities.set("preston", "5604473");
cities.set("sodasprings", "5607916");
cities.set("fishhaven", "5585010");

function getPageData(city) {
  const cityID = cities.get(city);
  const currentWeatherApiURL = `//api.openweathermap.org/data/2.5/weather?id=${cityID}&units=imperial&appid=11f9be110b488889077df997d7a7dcfc`;
  const forecastApiUrl = `//api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=imperial&appid=11f9be110b488889077df997d7a7dcfc`;

  const townDataURL =
    "https://byui-cit230.github.io/weather/data/towndata.json";

  // Get Current Weather
  fetch(currentWeatherApiURL)
    .then((response) => response.json())
    .then((jsonObject) => {
      const temp = jsonObject.main.temp;
      const windspeed = jsonObject.wind.speed;

      document.getElementById("desc").textContent =
        jsonObject.weather[0].description;
      document.getElementById("temp").textContent = jsonObject.main.temp_max;

      document.getElementById("humidity").textContent =
        jsonObject.main.humidity;
      document.getElementById("windspeed").textContent = windspeed;

      // calculate windchill
      calculateWindchill(temp, windspeed);

      // Fetch 5 Day Forecast
      return fetch(forecastApiUrl);
    })
    .then((response) => response.json())
    .then((jsonObject) => {
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

      weatherList.forEach((weather) => {
        let time = weather.dt_txt;
        // Get forecasts at 18:00:00
        if (time.includes("18:00:00")) {
          forecastDayNumber += 1;
          if (forecastDayNumber === 7) {
            forecastDayNumber = 0;
          }
          const forecastItem = document.createElement("div");
          forecastItem.classList = "forecast-item";
          const dayName = document.createElement("h4");
          dayName.textContent = weekday[forecastDayNumber];

          const iconPath =
            "//openweathermap.org/img/wn/" +
            weather.weather[0].icon +
            "@2x.png";
          const icon = document.createElement("img");
          icon.src = iconPath;
          icon.alt = weather.weather[0].description;

          const temp = document.createElement("p");
          temp.textContent = weather.main.temp + "\xB0F";

          forecastItem.appendChild(dayName);
          forecastItem.appendChild(icon);
          forecastItem.appendChild(temp);

          document.querySelector(".forecast-box").appendChild(forecastItem);
        }
      });

      // Fetch Town Data
      return fetch(townDataURL);
    })
    .then((response) => response.json())
    .then((jsonObject) => {
      const towns = jsonObject["towns"];

      // Fetch events based on page url
      const events = towns.find((town) =>
        path.includes(town.name.split(" ")[0].toLowerCase())
      ).events;
      events.forEach((event) => {
        const p = document.createElement("p");
        p.textContent = event;
        document.getElementById("events").appendChild(p);
      });
    });
}

const currentCity = Array.from(cities.keys()).find((city) =>
  path.includes(city)
);
getPageData(currentCity);
