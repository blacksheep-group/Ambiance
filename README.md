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

3. Plantower PMS7003
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

    For all the sensors:

    ```
    cd \ambiance\sketch-files\all-sensors
    ```
    For the Adafruit BME680 sensor:
    ```
    cd \ambiance\sketch-files\adafruit-bme680
    ```
    For the Adafruit SGP30 sensor:
    ```
    cd \ambiance\sketch-files\adafruit-sgp30
    ```
    For the Plantower PMS7003sensor:
    ```
    cd \ambiance\sketch-files\plantower-pms7003
    ```
3. Open the .ino file for the chosen sensor:

    ```
    cd \ambiance\sketch-files\
    ```
4. Install project dependencies using Library Manager:

    | Sensor             | Library Name            | Author    |
    | ------------------ | ----------------------- | --------- |
    | Adafruit BME680    | Adafruit BME680 Library | Adafruit  |
    | Adafruit SGP30     | Adafruit SGP30 Sensor   | Adafruit  |
    | Plantower PMS 7003 | PMS Library             | Mariusz   |
    
5. Connect the pins to the board. *(Note: Ambiance was designed for the ESP32, so the pin configurations may differ for your specific board.)*:
    | Sensor               |  Pin Label (I2C) | Pin Number (Default) |
    |--------------------- | ---------------- | -------------------- |
    | Adafruit BME680      | VCC              | VIN                  |
    |                      | GND              | GND                  |
    |                      | SCK              | 22                   |
    |                      | SDI              | 21                   |
    | Adafruit SGP30       | VCC              | VIN                  |
    |                      | GND              | GND                  |
    |                      | SCL              | 22                   |
    |                      | SDA              | 21                   |
    | Plantower PMS 7003   | VCC              | VIN                  |
    |                      | GND              | GND                  |
    |                      | RX               | TX                   |
    |                      | TX               | RX                   |
                            
  
6. Upload the chosen code on to the board.

## LoRa Initializaation
1. Clone the project repository from GitHub:	

    ```
    git clone https://github.com/marvinjameserosa/ambiance.git  
    ```
2. Navigate to sketch-files folder:

    ```
    cd \ambiance\sketch-files
    ```
3. Open the .ino file for both sender and receiver.
    
    For Sender:

    ```
    cd \ambiance\sketch-files\lora-sender
    ```
    For Receiver:
    ```
    cd \ambiance\sketch-files\lora-receiver
    ```

4. Install project dependencies using Library Manager
    ```
    LoRa by Sandeep Mistry
    ```
4. Connect the pins to the board. Pins are same for both Sender and Receiver.  *(Note: Ambiance was designed for the ESP32, so the pin configurations may differ for your specific board.)*:
    |  Pin Label (SPI) | Pin Number (Default)       |
    | ---------------- | -------------------------- |
    | VCC              | VIN                        |
    | GND              | GND                        |
    | MISO             | 19                         |
    | MOSI             | 23                         |
    | SCK              | 18                         |
    | CS               | 17 (any pin can be used)   |
    | RESET            | 14 (any pin can be used)   |
    | G0               | 26 (any pin can be used)   |
5. Upload both the sender and receiver to their respective board.

## Raspberry Pi Initialization
1. Enable Serial Port in the Raspberry Pi Configuration:
    ```
    start > Preferences > Raspberry Pi Configuration > Interfaces
    ```
2. Restart the Raspberry Pi.
3. Clone the project repository from GitHub:	
    ```
    git clone https://github.com/marvinjameserosa/ambiance.git  
    ```
4. Navigate to the repository folder:
    ```
    cd ./ambiance
    ```
5. Connect the receiver to the Raspberry Pi
6. Check the corresponding serial port using the command line:
    ```
    python -m serial.tools.miniterm 
    ```
7. In the sensor.py change the constant PORT to the corresponding serial port.
    ```
    PORT = '/dev/ttyACM0' 
    ```
9. Run the web.py.
    ```
    python3 web.py 
    ```
   
## Contributors
- Aldas, Dominic Syd V.
- Calangian, Mary Joyce F.
- Clavecillas, Christian C.
- Dacuan, David III
- dela Cruz, Jhon Carlo P.
- Erosa, Marvin James A.
- Esoreña, Reily Allen E.
- Macasindil, Mohammadryan 
- Madelo, Bryce Christian A. 
- Palaganas, Zophie Louise O.
- Teoxon, Mc James R.
- Tizon, Robie Elliz
