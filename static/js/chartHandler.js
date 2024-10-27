let dataPoints = [];
maxsize = 5;

function processData(maxsize) {
    return fetch('/sensor_data')
        .then(response => response.json())
        .then(data => {
            let datetime = data.date
            let time = datetime.split(' ')[1];
            let sensor = [
                data.temperature, 
                data.pressure, 
                data.humidity, 
                data.pm1, 
                data.pm2, 
                data.pm10,
                data.eco2,
                data.gas,
                data.tvoc
                ]
            dataPoints.push({ time, sensor });
        })
        .catch(error => console.error(error));
}

let myChart;

async function drawChart(index){
    logo_paths=['temperature.svg','pressure.svg','humidity.svg','pm1.svg','pm2.svg','pm10.svg','eco2.svg','gas.svg','tvoc.svg']
    const logoImg = document.querySelectorAll("#chart_logo")[0]
    logoImg.src= logoImg.src.split("/").slice(0,-1).join("/")+"/"+logo_paths[index]

    const ctx = document.getElementById('myChart').getContext('2d');
    //console.log(dataPoints)

    //if(dataPoints.length >= 10){
    //    dataPoints.shift();
    //}
    await processData();

    if (myChart) {
        myChart.destroy();
    }
    const titles=['TEMPERATURE','PRESSURE','HUMIDITY','PM1','PM2','PM10','ECO2','GAS','TVOC']
    const labelText = document.querySelector("#label_text");
    labelText.textContent = titles[index];
    let sensorArr = dataPoints.map(item => parseFloat(item.sensor[index]));
    let sensorVal = Math.round(sensorArr[sensorArr.length-1]);
    let minValY = sensorVal - 3;
    let maxValY = sensorVal + 2;
    console.log(sensorVal)
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map(item => item.time),
            datasets: [{
                data: dataPoints.map(item => parseFloat(item.sensor[index])),
                borderWidth: 3,
                pointRadius: 0,
                label: '',
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false 
                },
            },
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        maxTicksLimit: 6,
                    }
                },   
                y: {
                    min: minValY,
                    max: maxValY,
                    step: 1,
                    ticks: {
                        callback: function(value) {
                            let base = Math.round(value);
                            let tickVal = Array.from({ length: 7 }, (_, i) => base - 2 + i);
                            return tickVal.includes(value) ? value : '';
                        }
                    }
                }
            }
        }
    });
}
