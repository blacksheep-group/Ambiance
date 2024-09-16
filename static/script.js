function setZoom() {
	document.body.style.zoom = ""+window.innerHeight/7.3+"%";
}
window.onload = setZoom;

function formatTimeDate(timedate) {
    const year = timedate.getFullYear();
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const month = monthNames[timedate.getMonth()];
    const day = String(timedate.getDate());
    let hours = timedate.getHours();
    let minutes = String(timedate.getMinutes()).padStart(2, '0'); //shortened time parsing
    let ampm = "AM";
    if (hours >= 12) {
        ampm = "PM";
        hours %= 12;
    }
    if (hours === 0) {
        hours = 12; 
    }

    return `${hours}:${minutes} ${ampm} | ${month} ${day} ${year}`;
}

function updateTimeDate() {
    const now = new Date();
    const formattedTimeDate = formatTimeDate(now);
    document.getElementById("timedate").textContent = formattedTimeDate;
}

updateTimeDate();
setInterval(updateTimeDate, 1000);

function updateSensorValues() {
    const danger = ["green", "yellow", "orange", "red", "purple", "maroon"];
    const error_msg = "Oops! Something went wrong. Please reach out to the administrator for assistance. Error details: ";

    fetch('/sensor_data')
        .then(response => response.json())
        .then(data => {
            if (data.exception === "None") {
                document.getElementById("errorValue").hidden = true;
                document.getElementById("location").textContent = `${data.location} |`;

                const temperature = data.temperature;
                document.getElementById("temperatureValue").textContent = `${temperature} °C`;
                document.getElementById("temperatureValue").style.color = (temperature === "None") ? "" :
                    (temperature <= 28 && temperature >= 20) ? danger[0] :
                    !(temperature > 32 || temperature < 15) ? danger[1] :
                    danger[3];

                document.getElementById("pressureValue").textContent = `${data.pressure} hPa`;
                document.getElementById("pressureValue").style.color = (data.pressure === "None") ? "" :
                    (data.pressure <= 1030 && data.pressure >= 990) ? danger[0] :
                    !(data.pressure > 1100 || data.pressure < 900) ? danger[1] :
                    danger[3];

                document.getElementById("humidityValue").textContent = `${data.humidity} %`;
                document.getElementById("humidityValue").style.color = (data.humidity === "None") ? "" :
                    (data.humidity <= 60 && data.humidity >= 30) ? danger[0] :
                    !(data.humidity > 70 || data.humidity < 25) ? danger[1] :
                    danger[3];

                document.getElementById("pm1Value").textContent = `${data.pm1} µg/m³`;
                document.getElementById("pm1Value").style.color = (data.pm1 === "None") ? "" :
                    (data.pm1 <= 15) ? danger[0] :
                    (data.pm1 <= 30) ? danger[1] :
                    danger[2];

                document.getElementById("pm2Value").textContent = `${data.pm2} µg/m³`;
                document.getElementById("pm2Value").style.color = (data.pm2 === "None") ? "" :
                    (data.pm2 <= 12) ? danger[0] :
                    (data.pm2 <= 35.4) ? danger[1] :
                    (data.pm2 <= 55.4) ? danger[2] :
                    (data.pm2 <= 150.4) ? danger[3] :
                    (data.pm2 <= 250.4) ? danger[4] :
                    danger[5];

                document.getElementById("pm10Value").textContent = `${data.pm10} µg/m³`;
                document.getElementById("pm10Value").style.color = (data.pm10 === "None") ? "" :
                    (data.pm10 <= 54) ? danger[0] :
                    (data.pm10 <= 154) ? danger[1] :
                    (data.pm10 <= 254) ? danger[2] :
                    (data.pm10 <= 354) ? danger[3] :
                    (data.pm10 <= 424) ? danger[4] :
                    danger[5];

                document.getElementById("gasValue").textContent = `${data.gas} kΩ`;
                // Add limits and color logic for `gas` if needed

                document.getElementById("tvocValue").textContent = `${data.tvoc} ppb/t`;
                document.getElementById("tvocValue").style.color = (data.tvoc === "None") ? "" :
                    (data.tvoc <= 220) ? danger[0] :
                    (data.tvoc <= 660) ? danger[1] :
                    danger[3];

                document.getElementById("eco2Value").textContent = `${data.eco2} ppm`;
                document.getElementById("eco2Value").style.color = (data.eco2 === "None") ? "" :
                    (data.eco2 <= 600) ? danger[0] :
                    (data.eco2 <= 1000) ? danger[1] :
                    danger[3];

            } else {
                document.getElementById("errorValue").hidden = false;
                document.getElementById("errorValue").textContent = `${error_msg}${data.exception}`;
            }
        })
        .catch(error => {
            console.error('Error fetching sensor data:', error);
            document.getElementById("errorValue").textContent = `An error has occurred. Please kindly contact your administrator for further assistance. Error Message: ${error}`;
            document.getElementById("temperatureValue").textContent = "None";
            document.getElementById("pressureValue").textContent = "None";
            document.getElementById("humidityValue").textContent = "None";
            document.getElementById("pm1Value").textContent = "None";
            document.getElementById("pm2Value").textContent = "None";
            document.getElementById("pm10Value").textContent = "None";
            document.getElementById("gasValue").textContent = "None";
            document.getElementById("tvocValue").textContent = "None";
            document.getElementById("eco2Value").textContent = "None";
        });
}


updateSensorValues(); 
setInterval(()=>{
    updateSensorValues();
    drawChart(toDraw);
}, 1000);
