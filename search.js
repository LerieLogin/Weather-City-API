
const selectBox = document.getElementById('selectBox')
const form = document.querySelector('#form')

fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3fae0bb836271500c8b75c5b5f70b1f3')
    .then(function(response) {
        return response.json()
    })



    function handleSubmit(e) {
        e.preventDefault();
        const searchQueryLat = document.getElementById('searchInputLat').value;
        const searchQueryLon = document.getElementById('searchInputLon').value;
        console.log(searchQueryLat, searchQueryLon);
    
        locSearch(searchQueryLat, searchQueryLon);
    }
    
    function locSearch(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3fae0bb836271500c8b75c5b5f70b1f3`)
            .then(function(response) {
                return response.json();
            })
            .then(function(results) {
                console.log(results);
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
    }
form.addEventListener('submit', handleSubmit)

