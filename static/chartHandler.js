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
    const titles=['Temperature','Pressure','Humidity','PM1','PM2','PM10','ECO2','Gas','TVOC']
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
                title: {
                    display: true,
                    text: titles[index],
                    font: {
                        family:'Nunito',
                        size: 24,
                        weight: 'bold'
                    },
                    color: '#000',
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
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
                    min: 20, 
                    max: 34, 
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0); 
                        }
                    }
                }
            }
        }
    });
}
