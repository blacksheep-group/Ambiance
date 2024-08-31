import serial
import threading
import time
import datetime
import pandas as pd
import os

# Global configuration
PORT = None
BAUDRATE = 9600
DELAY = 1
CSV_FILE = 'data.csv'

data_dict = {
    'exception': '',
    'location': 'NO LOCATION',
    'date': '',
    'temperature': '0.00',
    'pressure': '0.00',
    'humidity': '0.00',
    'pm1': '0.00',
    'pm2': '0.00',
    'pm10': '0.00',
    'gas': '0.00',
    'tvoc': '0.00',
    'eco2': '0.00'
}

def get_port():
    global PORT
    if PORT is None:
        PORT = input("What port is your receiver: ")
    return PORT

def read_sensor_data():
    global data_dict
    port = get_port()
    
    while True:
        try:
            with serial.Serial(port=port, baudrate=BAUDRATE, timeout=1) as ser:
                while True:
                    raw_data = ser.readline().decode('utf-8').strip()
                    data = raw_data.split(':')
                    if len(data) == 2:
                        key, value = data
                        if key in data_dict:
                            data_dict[key] = value
                            data_dict['date'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    else:
                        print("Unexpected data format: " + raw_data)
        except serial.SerialException as e:
            data_dict['exception'] = str(e)
            data_dict['date'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            time.sleep(DELAY)

def to_csv():
    global data_dict
    while True:
        try:
            df = pd.DataFrame([data_dict])
            df.to_csv(CSV_FILE, mode='a', header=not os.path.isfile(CSV_FILE), index=False)
            time.sleep(DELAY)
        except Exception as e:
            print(f"Error in to_csv function: {e}")
            time.sleep(DELAY)

PORT = get_port()
threading.Thread(target=read_sensor_data, daemon=True).start()
threading.Thread(target=to_csv, daemon=True).start()
