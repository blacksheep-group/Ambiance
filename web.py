from flask import Flask, render_template, redirect, url_for
import sensor

app = Flask(__name__)


@app.route('/')

def index():
    error = "An error has occurred. Please kindly contact your administrator for further assistance. Error Message: "
    try:
        sensor_data = sensor.sensor_data()
        exception = sensor_data['exception']
        location = sensor_data['location']
        temperature = sensor_data['temperature']
        pressure = sensor_data['pressure']
        humidity = sensor_data['humidity']
        gas = sensor_data['gas']
        tvoc = sensor_data['TVOC']
        eco2= sensor_data['ECO2']
    except Exception as e:
        exception = error + str(e)
        location = "NO LOCATION"
    
    return render_template("index.html", 
    exception=exception, 
    location=location,
    temperature=temperature,
    pressure=pressure,
    humidity=humidity,
    gas=gas,
    tvoc=tvoc,
    eco2=eco2)

if __name__ == "__main__":
    app.run(debug=False)
