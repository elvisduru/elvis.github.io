//ADD the key and change units to imperial
const apiURL =
  "//api.openweathermap.org/data/2.5/weather?zip=02111,us&units=imperial&appid=11f9be110b488889077df997d7a7dcfc";

//Go fetch it and then wait for a response.
fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
    //Once it comes back, display it to the console.
    console.log(weatherInfo);

    document.getElementById("place").innerHTML = weatherInfo.name;
    document.getElementById("currentTemp").innerHTML = weatherInfo.main.temp;
    document.getElementById("windSpeed").innerHTML = weatherInfo.wind.speed;

    const iconcode = weatherInfo.weather[0].icon;
    const icon_path = "//openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById("weather_icon").setAttribute("src", icon_path);
  }); //end of "then" fat arrow function
