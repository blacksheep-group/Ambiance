function setZoom() {
	document.body.style.zoom = ""+window.innerHeight/7.3+"%";
}
window.onload = setZoom;
window.onresize =setZoom;

function formatTimeDate(timedate) {
    const year = timedate.getFullYear();
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const month = monthNames[timedate.getMonth()];
    const day = String(timedate.getDate());
    let hours = timedate.getHours();
    const minutes = (timedate.getMinutes()<10)? "0"+String(timedate.getMinutes()):String(timedate.getMinutes());
    const seconds = (timedate.getSeconds()<10)? "0"+String(timedate.getSeconds()):String(timedate.getSeconds());
    let ampm = "AM";
    if (hours >= 12) {
        ampm = "PM";
        hours %= 12;
    }
    if (hours === 0) {
        hours = 12; 
    }

    return `${hours}:${minutes}:${seconds} ${ampm} | ${month} ${day} ${year}`;
}

function updateTimeDate() {
    const now = new Date();
    const formattedTimeDate = formatTimeDate(now);
    document.getElementById("timedate").textContent = formattedTimeDate;
}

updateTimeDate();
setInterval(updateTimeDate, 1000);

function updateSensorValues() {
    fetch('/sensor_data')
      .then(response => response.json())
      .then(data => {
        var exception = data.exception;
        document.getElementById("errorValue").textContent = exception;

        var location = data.location;
        document.getElementById("location").textContent = location + " |";

        var temperature = data.temperature;
        document.getElementById("temperatureValue").textContent = temperature + " °C";

        var pressure = data.pressure;
        document.getElementById("pressureValue").textContent = pressure + " hPa";

        var humidity = data.humidity;
        document.getElementById("humidityValue").textContent = humidity + " %";

        var pm1 = data.pm1;
        document.getElementById("pm1Value").textContent = pm1 + " µg/m³";

        var pm2 = data.pm2;
        document.getElementById("pm2Value").textContent = pm2 + " µg/m³";

        var pm10 = data.pm10;
        document.getElementById("pm10Value").textContent = pm10 + " µg/m³";

        var gas = data.gas;
        document.getElementById("gasValue").textContent = gas + " kΩ";

        var tvoc = data.tvoc;
        document.getElementById("tvocValue").textContent = tvoc + " ppb/t";

        var eco2 = data.eco2;
        document.getElementById("eco2Value").textContent = eco2 + " ppm";
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
        document.getElementById("temperatureValue").textContent = "Error fetching data";
        document.getElementById("pressureValue").textContent = "Error fetching data";
        document.getElementById("humidityValue").textContent = "Error fetching data";
        document.getElementById("pm1Value").textContent = "Error fetching data";
        document.getElementById("pm2Value").textContent = "Error fetching data";
        document.getElementById("pm10Value").textContent = "Error fetching data";
        document.getElementById("gasValue").textContent = "Error fetching data";
        document.getElementById("tvocValue").textContent = "Error fetching data";
        document.getElementById("eco2Value").textContent = "Error fetching data";
      });
  }

  updateSensorValues(); 
  setInterval(updateSensorValues, 1000);