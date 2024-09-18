let dataPoints = [];
maxsize = 5;

function processData(maxsize) {
    return fetch('/sensor_data')
        .then(response => response.json())
        .then(data => {
            let datetime = data.date
            let time = datetime.split(' ')[1];
            let sensor = data.temperature
            dataPoints.push({ time, sensor });
        })
        .catch(error => console.error(error));
}

let myChart;

async function drawChart(index){
    const ctx = document.getElementById('myChart').getContext('2d');
    console.log(dataPoints)

    //if(dataPoints.length >= 10){
    //    dataPoints.shift();
    //}
    await processData();

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map(item => item.time),
            datasets: [{
                data: dataPoints.map(item => parseFloat(item.sensor)),
                borderWidth: 3,
                pointRadius: 0,
                label: '',
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false 
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
