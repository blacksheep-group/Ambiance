let dataPoints = [];

function processData(index) {
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
    console.log(processData())
    await processData();

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map(item => item.time),
            datasets: [{
                label: 'Temperature',
                data: dataPoints.map(item => parseFloat(item.sensor)),
                borderWidth: 1
            }]
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                        ticks: {
                            stepSize:0.1,
                            maxTicksLimit: 5,
                        }
                }
            }
        }
    });
}
