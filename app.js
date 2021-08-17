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

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1b70e9dbe181a003d9a86c7d2a22a6bc`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp } = data.main;
                const { main, icon } = data.weather[0]
                console.log(data.weather[0].icon)
            // Set DOM Elements from the API
            let tempAdjusted = Math.floor(temp - 273.15)
            temperatureDegree.textContent = tempAdjusted;
            temperatureDescription.textContent = main;
            locationTimezone.textContent = data.name; 
            weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`

            //Formula for Fahrenheit
            let fahrenheit = (tempAdjusted * 9/5) + 32;
               
            //Toggle Fahrenheit and Celsius

            tempSection.addEventListener('click', () => {
                if (tempSpan.textContent === "C") {
                    tempSpan.textContent = "F";
                    temperatureDegree.textContent = fahrenheit;
                } else {
                    tempSpan.textContent = "C";
                    temperatureDegree.textContent = tempAdjusted;
                }
            })

            })
        });
    } else {
        h1.textContent = "Please enable geolocation in your browser"
    }
})


    
    
    
 
    


   