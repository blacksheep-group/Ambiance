const drawChart = () => {
   const svg = document.getElementById('line-chart');
    const width = svg.getAttribute('width');
    const height = svg.getAttribute('height');
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Function to parse CSV data and limit to the last 10 points
    function parseCSV(data) {
        const rows = data.split('\n').slice(1);
        const parsedData = rows.map(row => {
            const columns = row.split(',');
            const dateTime = new Date(columns[2]);
            const temperature = parseFloat(columns[3]); 

            return { time: dateTime, temperature: temperature };
        });

        // Only return the last 10 points
        return parsedData.slice(-10);
    }

    // Function to scale the data to fit within the SVG canvas
    function getScales(data) {
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.time))
            .range([margin.left, chartWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.temperature)])
            .range([chartHeight, margin.top]);

        return { xScale, yScale };
    }

    // Function to draw gridlines
    function drawGridlines(xScale, yScale) {
        // Horizontal gridlines
        const yAxisGrid = d3.axisLeft(yScale)
            .tickSize(-chartWidth)
            .tickFormat('');

        d3.select(svg)
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(yAxisGrid);

        // Vertical gridlines
        const xAxisGrid = d3.axisBottom(xScale)
            .tickSize(-chartHeight)
            .tickFormat('');

        d3.select(svg)
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxisGrid);
    }

    // Function to draw axes with labels and numbers
    function drawAxes(xScale, yScale) {
        // X-axis
        const xAxis = d3.axisBottom(xScale)
            .ticks(6)
            .tickFormat(d3.timeFormat('%H:%M:%S')); // Format to only show time (HH:MM:SS)

        d3.select(svg)
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        // Y-axis
        const yAxis = d3.axisLeft(yScale).ticks(5);

        d3.select(svg)
            .append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(yAxis);

        // X-axis label
        d3.select(svg)
            .append('text')
            .attr('class', 'x-label')
            .attr('text-anchor', 'middle')
            .attr('x', chartWidth / 2)
            .attr('y', height - 10)
            .text('Time');

        // Y-axis label
        d3.select(svg)
            .append('text')
            .attr('class', 'y-label')
            .attr('text-anchor', 'middle')
            .attr('transform', `rotate(-90)`)
            .attr('x', -chartHeight / 2)
            .attr('y', 15)
            .text('Temperature (°C)');
    }

    // Function to update the line chart
    function updateChart(data) {
        const { xScale, yScale } = getScales(data);

        // Clear previous chart content
        d3.select(svg).selectAll('*').remove();

        // Draw gridlines and axes
        drawGridlines(xScale, yScale);
        drawAxes(xScale, yScale);

        // Line generator function
        const line = d3.line()
            .x(d => xScale(d.time))
            .y(d => yScale(d.temperature))
            .curve(d3.curveLinear);

        // Create line path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', line(data));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'blue');
        path.setAttribute('stroke-width', 2);
        svg.appendChild(path);
    }

    // Function to fetch CSV data and update the chart
    function fetchDataAndUpdate() {
        fetch('/static/data.csv')
            .then(response => response.text())
            .then(csvData => {
                const parsedData = parseCSV(csvData);
                updateChart(parsedData);
            })
            .catch(error => console.error('Error loading CSV:', error));
    }

    // Fetch and update data every 5 seconds
    setInterval(fetchDataAndUpdate, 5000);

    // Initial load
    fetchDataAndUpdate();
};
