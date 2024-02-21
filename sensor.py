import serial
def sensor_data():
    data_array = ['', 'NA', 'NA', 'NA']
    error = "An error has occurred. Please kindly contact your administrator for further assistance. Error Message: "
    try:
        ser = serial.Serial(port='COM5', baudrate=9600)
        data_array[0] = ''
        data = ser.readline().decode('utf-8').strip()
        data_array[1] = data
        data_array[2] = data
    except serial.SerialException as e:
        error = error + str(e)
        data_array[0] = error
    
    return data_array

