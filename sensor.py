import serial
def sensor_data():
    data_dict = {'exception':'', 'location':'NO LOCATION'}
    error = "An error has occurred. Please kindly contact your administrator for further assistance. Error Message: "
    try:
        ser = serial.Serial(port='COM6', baudrate=9600)
        data_dict['exception'] = ''
        raw_data = ser.readline().decode('utf-8').strip()
        label = raw_data.split(':')
        data_dict[label[0]] = label[1]
    except serial.SerialException as e:
        error = error + str(e)
        data_dict['exception'] = error
    
    return data_dict

