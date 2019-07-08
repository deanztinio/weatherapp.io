window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let smallLat = document.querySelector('.small-lat');
    let smallLong = document.querySelector('.small-long');
    let temperatureDescriptionFuture = document.querySelector('.temperature-description-future');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/2dbd1f246b479c3892d6e38d149cfba2/${lat},${long}`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const{temperature, summary, icon} = data.currently;
                // set DOM Elements from the API
                tempFloat = ((temperature - 32) * 5/9);
                tempFixed = tempFloat.toFixed(2);
                temperatureDegree.textContent = tempFixed;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                smallLat.textContent = data.latitude;
                smallLong.textContent = data.longitude;
                setIcons(icon, document.querySelector(".weather-icon"));
                temperatureDescriptionFuture.textContent = data.hourly.summary

                // temp
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "°F"){
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = tempFixed;
                    }
                    else{
                        temperatureSpan.textContent = "°F";
                        fTemp = temperature.toFixed(2);
                        temperatureDegree.textContent = fTemp;
                    }
                });
            });
            
        });


    } 
    else{
        h1.textContent = "Hey retard, enable your location cucksucker"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});