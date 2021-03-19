const apiURL =
  "//api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=11f9be110b488889077df997d7a7dcfc";

fetch(apiURL)
  .then((response) => response.json())
  .then((jsonObject) => {
    console.log(jsonObject);
    document.getElementById("current-temp").textContent = jsonObject.main.temp;

    const imagesrc =
      "//openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    const desc = jsonObject.weather[0].description;
    document.getElementById("imagesrc").textContent = imagesrc;
    document.getElementById("icon").setAttribute("src", imagesrc);
    document.getElementById("icon").setAttribute("alt", desc);
  });
