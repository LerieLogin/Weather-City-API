
const selectBox = document.getElementById('selectBox');
const form = document.querySelector('#form');

// fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3fae0bb836271500c8b75c5b5f70b1f3')
//     .then(function(response) {
//         return response.json()
//     })

// Create weather container
const weatherContainer = document.createElement('div');
weatherContainer.setAttribute('id', 'weather-container');

document.body.appendChild(form);
document.body.appendChild(weatherContainer);


    function handleSubmit(e) {
        e.preventDefault();
        const city = document.getElementById('city').value;
        
        console.log(city);
    
        locSearch(city);
    }
    
    function locSearch(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8202a8e9867c262730bb310656a19c80&cnt=40&units=imperial`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                
                const cityName = data.city.name;
    
                // Create weather cards for each day
                for (let i = 0; i < data.list.length; i += 8) { 
                    const forecastData = data.list[i];
                    const date = new Date(forecastData.dt * 1000); 

                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    
                    const temperature = Math.round(forecastData.main.temp); 
                    const cloudCoverage = forecastData.clouds.all;
    
                    
                    const weatherCard = document.createElement('div');
                    const cityNameElement = document.createElement('h2');
                    const dateElement = document.createElement('p');
                    const temperatureElement = document.createElement('p');
                    const cloudCoverageElement = document.createElement('p');
                    
                    weatherCard.classList.add('weather-card');
                    
                    cityNameElement.textContent = cityName;
                    dateElement.textContent = dayOfWeek;
                    temperatureElement.textContent = `Temperature: ${temperature}°F`; 
                    cloudCoverageElement.textContent = `Cloud Coverage: ${cloudCoverage}%`;
    
                    
                    weatherCard.appendChild(cityNameElement);
                    weatherCard.appendChild(dateElement);
                    weatherCard.appendChild(temperatureElement);
                    weatherCard.appendChild(cloudCoverageElement);
                    weatherContainer.appendChild(weatherCard);
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
    }
    
    
form.addEventListener('submit', handleSubmit)
