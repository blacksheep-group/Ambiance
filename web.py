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
    except Exception as e:
        exception = error + str(e)
        location = "NO LOCATION"
    
    return render_template("index.html", 
    exception=exception, 
    location=location)

if __name__ == "__main__":
    app.run(debug=False)
