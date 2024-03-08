import serial

def sensor_data():
    PORT = 'COM6' # Change this to the corresponding serial port
    BAUDRATE = 9600 # Change this to what baudrate you require
    data_dict = {
        'exception':'',
        'location':'NO LOCATION',
        'temperature':'None',
        'pressure':'None',
        'humidity':'None',
        'pm1':'None',
        'pm2':'None',
        'pm10':'None',
        'gas':'None',
        'tvoc':'None',
        'eco2':'None'
    }
    
    error = "An error has occurred. Please kindly contact your administrator for further assistance. Error Message: "
    
    try:
        ser = serial.Serial(port=PORT, baudrate=BAUDRATE)
        data_dict['exception'] = ''
        
        for key in range(7):
            raw_data = ser.readline().decode('utf-8').strip()
            data = raw_data.split(':')
            data_dict[data[0]] = data[1]
                
    except serial.SerialException as e:
        error = error + str(e)
        data_dict['exception'] = error
    
    return data_dict

