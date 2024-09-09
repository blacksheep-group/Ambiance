function processData(csvData) {
    const lines = csvData.split('\n').reverse();
    const dataPoints = [];
    const timeSeen = {};
    let lastTime = lines

    lines.some((line, index) => {
        if (index > 9) return true; // Skip header
        const fields = line.split(',');
        const time = fields[2].split(' ')[1]; // Get only the time part
        
        // Check if the time exists
        if (!timeSeen[time]) {
            timeSeen[time] = true;
            dataPoints.push({
                time: fields[2].split(' ')[1],
                time0: fields[2].split(' ')[1],
                readings: fields.slice(-9),
                index: index

            });
        }else{
            let date = new Date(1970, 0, 1, ...time.split(':'));
            date.setSeconds(date.getSeconds() - 1);

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            const timesub1 = `${hours}:${minutes}:${seconds}`
            timeSeen[timesub1] = true;
            dataPoints.push({
                time: timesub1,
                time0: fields[2].split(' ')[1],
                readings: fields.slice(-9),
                index: index
            });
        }
    });

    return dataPoints.slice(-10);
}

function getData(){
	fetch('/static/data.csv')
        .then(response => response.text())
        .then(csvData => {
            const parsedData = processData(csvData);
            //updateChart(parsedData);
            data = parsedData
            console.log(data)
        })
        .catch(error => console.error('Error loading CSV:', error));
}

function drawChart(){
	getData();

}