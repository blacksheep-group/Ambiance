import serial
import threading
import time
import datetime
import pandas as pd

PORT = None  
BAUDRATE = 9600
DELAY = 1
data_dict = {
    'exception':'',
    'location':'NO LOCATION',
    'date':'',
    'temperature':'0.00',
    'pressure':'0.00',
    'humidity':'0.00',
    'pm1':'0.00',
    'pm2':'0.00',
    'pm10':'0.00',
    'gas':'0.00',
    'tvoc':'0.00',
    'eco2':'0.00'
}

def get_port():
    global PORT
    if not PORT:
        PORT = input("What port is your receiver: ") 
    return PORT

def read_sensor_data():
    global data_dict
    PORT = get_port()
    while True:
        try:
            ser = serial.Serial(port=PORT, baudrate=BAUDRATE)
            while True: 
                raw_data = ser.readline().decode('utf-8').strip()
                data = raw_data.split(':')
                if len(data) == 2:
                        key, value = data
                        if key in data_dict:
                            data_dict[key] = value
                            now = datetime.datetime.now()
                            data_dict['date'] = now.strftime("%Y-%m-%d %H:%M:%S")
                else:
                    data_dict['exception'] = "Unexpected data format:", raw_data
                    now = datetime.datetime.now()
                    data_dict['date'] = now.strftime("%Y-%m-%d %H:%M:%S")
        except serial.SerialException as e:
            data_dict['exception'] = str(e)
            now = datetime.datetime.now()
            data_dict['date'] = now.strftime("%Y-%m-%d %H:%M:%S")
        
def to_csv(file_path='data.csv'):
    global data_dict
    while True:
        try:
            df = pd.DataFrame([data_dict])
            
            df.to_csv(file_path, mode='a', header=not pd.io.common.file_exists(file_path), index=False)
            
            time.sleep(DELAY)
        except Exception as e:
            print(f"Error in to_csv function: {e}")
            time.sleep(DELAY)
    
PORT = get_port()
threading.Thread(target=read_sensor_data, daemon=True).start()
threading.Thread(target=to_csv, daemon=False).start()