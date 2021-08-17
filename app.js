window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.icon');
    const tempSection = document.getElementById('temperature');
    let tempSpan = document.getElementById('degree');
    
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.weatherstack.com/current?access_key=a3c62236374e3f3a3b9cc0f2443bba84&query=${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, weather_descriptions, weather_icons } = data.current;
                const { name, region } = data.location
            // Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = weather_descriptions;
            locationTimezone.textContent = name + ", " + region; 
            weatherIcon.src = weather_icons;

            //Formula for Fahrenheit
            let fahrenheit = (temperature * 9/5) + 32;
               
            //Toggle Fahrenheit and Celsius

            tempSection.addEventListener('click', () => {
                if (tempSpan.textContent === "C") {
                    tempSpan.textContent = "F";
                    temperatureDegree.textContent = fahrenheit;
                } else {
                    tempSpan.textContent = "C";
                    temperatureDegree.textContent = temperature;
                }
            })

            })
        });
    } else {
        h1.textContent = "Please enable geolocation in your browser"
    }
})


    
    
    
 
    


   