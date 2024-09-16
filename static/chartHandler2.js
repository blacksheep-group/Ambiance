function processData(csvData) {
    const lines = csvData.split('\n').slice(-11,-1);
    const dataPoints = [];
    const timeSeen = {};
    let lastTime = lines

    lines.forEach((line, index) => {
        const fields = line.split(',');
        const time = fields[2].split(' ')[1]; // Get only the time part
        
        // Check if the time exists
        if (!timeSeen[time]) {
            timeSeen[time] = true;
            const hour = parseInt(time.split(':')[0])

            dataPoints.push({
                time: hour == 0 ? '12'+time.slice(2)+' AM':
                              hour == 12? time + ' PM':
                              hour > 12 ? '' + hour % 12 + time.slice(2) + ' PM' :
                              time,
                readings: fields.slice(-9).map(item=>item.replace(/[^\d.]/g, '')) //regex removes units
            });
        }else{
            let date = new Date(1970, 0, 1, ...time.split(':'));
            date.setSeconds(date.getSeconds() - 1);

            let timesub1 = date.toString().split(' ')[4];
            timeSeen[timesub1] = true;

            //parsing for 12-hour format
            const hour = parseInt(timesub1.split(':')[0])
            timesub1 = hour == 0 ? '12'+timesub1.slice(2)+' AM':
                              hour == 12? timesub1 + ' PM':
                              hour > 12 ? '' + hour % 12 + timesub1.slice(2) + ' PM' :
                              timesub1;

            dataPoints.push({
                time: timesub1,
                readings: fields.slice(-9).map(item=>item.replace(/[^\d.]/g, '')),
                index: index
            });
        }
    });

    return dataPoints.slice(-10);
}

function getData(){
	return fetch('/static/data.csv')
        .then(response => response.text())
        .then(csvData => {
            const parsedData = processData(csvData);
           return parsedData;
        })
        .catch(error => console.error('Error loading CSV:', error));
}

let myChart;

async function drawChart(index){
    const rootStyles = getComputedStyle(document.documentElement);

    const pupGold = rootStyles.getPropertyValue('--pup-gold').trim();
    const backgroundRed = rootStyles.getPropertyValue('--background-red').trim();
    const chartGridColor = rootStyles.getPropertyValue('--chart-grid-color').trim();

    const ctx = document.getElementById('myChart').getContext('2d');
    let plotables = await getData();

    if (myChart) {
        myChart.destroy();
    }

    const chartLabel = toDraw == 0? 'Temperature': 'idk';

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: plotables.map(item=>item.time),
            datasets: [{
                data: plotables.map(item => parseFloat(item.readings[index])),
                borderWidth: 2,
                borderColor: pupGold,
                backgroundColor: `${pupGold}20`,
                pointBackgroundColor: backgroundRed,
            }]
        },
        options: {
            title:'none',
            legend:'none',
            animation:false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#0005',
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            family: 'Nunito'
                        }
                    }
                },
                y: {
                    grid:{
                        color: '#0005'
                    },
                    ticks: {
                        stepSize:0.1,
                        maxTicksLimit: 10,
                        color: 'black',
                        font: {
                            family: 'Nunito'
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: chartLabel,
                    font: {
                        family: 'Nunito',
                        size: 25,
                        weight: 'bold'
                    },
                    color: 'black',
                },
                legend: {
                    display: false,  // Disable the legend
                }
            }
        }
    });
}


let toDraw = 0;

const divs = document.querySelectorAll('.sensor-data');

divs.forEach((div, index) => {
  div.addEventListener('click', () => {
    toDraw = index;
  });
});
