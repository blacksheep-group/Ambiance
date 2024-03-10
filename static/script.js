function setZoom() {
	document.body.style.zoom = ""+window.innerHeight/7.3+"%";
}
window.onload = setZoom;
window.onresize =setZoom;

//date and time
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

//color coding
var danger=["green", "yellow", "orange", "red", "purple", "maroon"]

//sensor data fetching
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
        document.getElementById("temperatureValue").style.color= (temperature=="None")? "":
                                                                (temperature<=28 && temperature>=20)? danger[0]: 
                                                                !(temperature>32 || temperature<15)? danger[1]:
                                                                danger[3];

        var pressure = data.pressure;
        document.getElementById("pressureValue").textContent = pressure + " hPa";
        document.getElementById("pressureValue").style.color=   (pressure=="None")? "":
                                                                (pressure<=1030 && pressure>=990)? danger[0]: 
                                                                !(pressure>1100 || pressure<900)? danger[1]:
                                                                danger[3];

        var humidity = data.humidity;
        document.getElementById("humidityValue").textContent = humidity + " %";
        document.getElementById("humidityValue").style.color=   (humidity=="None")? "":
                                                                (humidity<=60 && humidity>=30)? danger[0]: 
                                                                !(humidity>70 || humidity<25)? danger[1]:
                                                                danger[3];

        var pm1 = data.pm1;
        document.getElementById("pm1Value").textContent = pm1 + " µg/m³";
        document.getElementById("pm1Value").style.color=   (pm1=="None")? "":
                                                                (pm1<=15)? danger[0]: 
                                                                (pm1<=30)? danger[1]:
                                                                danger[2];


        var pm2 = data.pm2;
        document.getElementById("pm2Value").textContent = pm2 + " µg/m³";
        document.getElementById("pm2Value").style.color=   (pm2=="None")? "":
                                                                (pm2<=12)? danger[0]: 
                                                                (pm2<=35.4)? danger[1]:
                                                                (pm2<=55.4)? danger[2]:
                                                                (pm2<=150.4)? danger[3]:
                                                                (pm2<=250.4)? danger[4]:
                                                                danger[5];

        var pm10 = data.pm10;
        document.getElementById("pm10Value").textContent = pm10 + " µg/m³";
        document.getElementById("pm10Value").style.color=   (pm10=="None")? "":
                                                                (pm10<=54)? danger[0]: 
                                                                (pm10<=154)? danger[1]:
                                                                (pm10<=254)? danger[2]:
                                                                (pm10<=354)? danger[3]:
                                                                (pm10<=424)? danger[4]:
                                                                danger[5];

        var gas = data.gas;
        document.getElementById("gasValue").textContent = gas + " kΩ";
        //limits needed here

        var tvoc = data.tvoc;
        document.getElementById("tvocValue").textContent = tvoc + " ppb/t";
        document.getElementById("tvocValue").style.color=   (tvoc=="None")? "":
                                                                (tvoc<=220)? danger[0]: 
                                                                (tvoc<=660)? danger[1]:
                                                                danger[3];

        var eco2 = data.eco2;
        document.getElementById("eco2Value").textContent = eco2 + " ppm";
        document.getElementById("eco2Value").style.color=   (eco2=="None")? "":
                                                                (eco2<=600)? danger[0]: 
                                                                (eco2<=1000)? danger[1]:
                                                                danger[3];
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
        document.getElementById("errorValue").textContent = "An error has occurred. Please kindly contact your administrator for further assistance. Error Message", error;
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
  setInterval(updateSensorValues, 1000);