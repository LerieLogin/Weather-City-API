const form = document.querySelector("#form");
const weatherContainer = document.createElement("div");
const cityButtonContainer = document.createElement("div");

weatherContainer.setAttribute("id", "weather-container");
cityButtonContainer.classList.add("citycontain");

document.body.appendChild(form);
document.body.appendChild(weatherContainer);
document.body.appendChild(cityButtonContainer);

function handleSubmit(e) {
  e.preventDefault();

  let city = document.getElementById("city").value;
  console.log(city);
  locSearch(city);
}

function locSearch(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8202a8e9867c262730bb310656a19c80&cnt=40&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const cityOutput = data.city.name;

      weatherContainer.innerHTML = "";

      // creates cards for each day and assings data
      for (let i = 0; i < data.list.length; i += 8) {
        const forecastData = data.list[i];
        const date = new Date(forecastData.dt * 1000);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const weatherIcon = forecastData.weather[0].icon;
        const windSpeed = Math.round(forecastData.wind.speed);
        const humidity = forecastData.main.humidity;
        const temperature = Math.round(forecastData.main.temp);
        const cloudCoverage = forecastData.clouds.all;

        const weatherCard = document.createElement("div");
        weatherCard.classList.add("card");

        let weatherIconEl = document.createElement("img");
        weatherIconEl.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

        const windSpeedEl = document.createElement("p");
        const cityNameEl = document.createElement("h2");
        const dateEl = document.createElement("p");
        const temperatureEl = document.createElement("p");
        const cloudCoverageEl = document.createElement("p");
        const humidityEl = document.createElement("p");

        cityNameEl.textContent = cityName;
        dateEl.textContent = dayOfWeek;
        temperatureEl.textContent = `Temperature: ${temperature}°F`;
        humidityEl.textContent = `Humidty: ${humidity}`;
        cloudCoverageEl.textContent = `Cloud Coverage: ${cloudCoverage}%`;
        windSpeedEl.textContent = `Wind speed: ${windSpeed}`;

        // append data to card
        weatherCard.appendChild(weatherIconEl);
        weatherCard.appendChild(cityNameEl);
        weatherCard.appendChild(dateEl);
        weatherCard.appendChild(temperatureEl);
        weatherCard.appendChild(cloudCoverageEl);
        weatherCard.appendChild(windSpeedEl);
        weatherCard.appendChild(humidityEl);

        weatherContainer.appendChild(weatherCard);
      }
      // calls create new button
      createCityButton(cityOutput);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

const cityButtons = new Set(
  JSON.parse(localStorage.getItem("cityButtons")) || []
);
// sets city buttons in local storage to save
function saveCityButtons() {
  localStorage.setItem("cityButtons", JSON.stringify(Array.from(cityButtons)));
}
// creates city button
function createCityButton(cityName) {
  const existingButton = document.querySelector(
    `.city-button[data-city="${cityName}"]`
  );
  //if button exists retun nothing
  if (existingButton) {
    return;
  }

  var button = document.createElement("button");
  button.classList.add("city-button");
  button.textContent = cityName;
  button.setAttribute("data-city", cityName);
  button.addEventListener("click", function () {
    handleNewButton(cityName);
  });
  
  cityButtonContainer.appendChild(button);


  cityButtons.add(cityName);
  saveCityButtons();
}

function handleNewButton(cityName) {
  locSearch(cityName);
}

function init() {
  cityButtons.forEach(createCityButton);
  form.addEventListener("submit", handleSubmit);
}

init();
