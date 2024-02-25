# Ambiance

## Project Description

Ambiance is an air quality monitoring system developed by PUP Hygears for the Polytechnic University of the Philippines. It features a user-friendly interface optimized to run on a Raspberry Pi 4. Leveraging Lorawan technologies, sensor data is efficiently transmitted for analysis and monitoring.

## Sensors:

1. Adafruit BME680
- Temperature 
- Pressure
- Humidity
- Biogenic Volatile Organic Compound (Gas Sensor)

2. Adafruit SME30
- Total Volatile Organic Compound
- ECo2

3. Plantower PMS 7003
- PM 1.0
- PM 2.5
- PM 10.0


## Installation

1. Clone the project repository from GitHub:	

   ```
   git clone https://github.com/marvinjameserosa/ambiance.git

2. Navigate to the project folder:

   ```
   cd \Ambiance
   ```

3. Install project dependencies:

Note make sure to install python

For web app interface:
   ```
   pip install flask
   ```

For recieving the data:
   ```
   pip install pyserial
   ```

4. Start the development server:

   ```
   python3 web.py
   ```



## Sensor Initialization



## Contributors

