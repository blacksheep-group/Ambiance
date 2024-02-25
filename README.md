# Ambiance


## Project Description

Ambiance is an air quality monitoring system developed by PUP Hygears for the Polytechnic University of the Philippines. It boasts a user-friendly interface tailored to operate seamlessly on a Raspberry Pi 4. Utilizing Lorawan technologies, data from ESP32-connected sensors is efficiently transmitted for comprehensive analysis and real-time monitoring.

## Sensors:

1. Adafruit BME680
    - Temperature 
    - Pressure
    - Humidity
    - Biogenic Volatile Organic Compound (Gas Sensor)

2. Adafruit SGP30
    - Total Volatile Organic Compound
    - ECO<sub>2</sub>

3. Plantower PMS 7003
    - PM 1.0
    - PM 2.5
    - PM 10.0


## Installation

1. Clone the project repository from GitHub:	

    ```
    git clone https://github.com/marvinjameserosa/ambiance.git  
    ```

2. Navigate to the project folder:

    ```
    cd \Ambiance
    ```
2. Install python *(Note: Python v11 was used for development)*:

    ```
    https://www.python.org/downloads
    ```
3. Install project dependencies:

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
1. Clone the project repository from GitHub:	

    ```
    git clone https://github.com/marvinjameserosa/ambiance.git  
    ```
2. Navigate to sketch-files folder:

    ```
    cd \Ambiance\sketch-files
    ```
3. Install project dependencies using Library Manager:

    | Sensor             | Library Name            | Author    |
    | ------------------ | ----------------------- | --------- |
    | Adafruit BME680    | Adafruit BME680 Library | Adafruit  |
    | Adafruit SGP30     | Adafruit SGP30 Sensor   | Adafruit  |
    | Plantower PMS 7003 | PMS Library             | Mariusz   |
    
4. Connect the pins to the board. *(Note: Ambiance was designed for the ESP32, so the pin configurations may differ for your specific board.)*:
    | Sensor               |  Pin Label (I2C) | Pin Number (Default) |
    |--------------------- | ---------------- | -------------------- |
    | Adafruit BME680      | VCC              | VIN                  |
    |                      | GND              | GND                  |
    |                      | SCK              | D22                  |
    |                      | SDI              | D21                  |
    | Adafruit SGP30       | VCC              | VIN                  |
    |                      | GND              | GND                  |
    |                      | SCL              | D22                  |
    |                      | SDA              | D21                  |
    | Plantower PMS 7003   | VCC              | VIN                  |
    |                      | GND              | GND                  |
    |                      | RX               | TX0                  |
    |                      | TX               | RX0                  |
                            
  
5. Upload the code board.

    
## Contributors

